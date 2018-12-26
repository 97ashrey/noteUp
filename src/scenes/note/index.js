import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { createNote, deleteNote, updateNote } from '../../actions/notesActions';

import Section from '../../components/Section';
import Header from './components/header';
import NoteInfo from './components/note-info'
import TextArea from './components/TextArea';

import openModalHandler from '../../HOC/openModalHandler';
import messageControlls from '../../HOC/messageControlls';
import blockNavigation from '../../HOC/blockNavigation';

import NoteData from '../../entities/NoteData';
import { noteState } from './services/constants';
import { ButtonName } from '../../services/constants'


class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteData: {},
      state: null,
      // inputs
      title: "",
      body: "",
      // render controlls
      redirect: false,
      undo: false,
      newNote: false,
    }

    const { DELETE, DELETE_FOREVER, RESTORE, UNDO, ARCHIVE, UNARCHIVE } = ButtonName;
    const handler = {
      [DELETE] : {
        yesCallback: ()=>{this.noteUpdateHandler(DELETE)},
        title: 'Delete',
        message: 'Move note to the trash can?'
      },
      [DELETE_FOREVER] : {
        yesCallback: this.deleteNoteForever,
        title: 'Permanently delete',
        message: 'Permanently delete note?'
      },
      [RESTORE] : {
        yesCallback: ()=>{this.noteUpdateHandler(RESTORE)},
        title: 'RESTORE',
        message: 'Do you want to restore note?'
      },
      [UNDO] : {
        yesCallback: this.undoChanges,
        title: 'Undo',
        message: 'Undo changes?'
      },
      [ARCHIVE] : {
        yesCallback: ()=>{this.noteUpdateHandler(ARCHIVE)},
        title: 'Archive',
        message: 'Archive note?'
      },
      [UNARCHIVE] : {
        yesCallback: ()=>{this.noteUpdateHandler(RESTORE)},
        title: 'Unarchive',
        message: 'Unarchive note?'
      }
    }
    this.openModalHandler = props.openModalHandler.bind(this,handler);
    props.setWhen(this.when);
    props.setOnBlock(this.onBlock);
  }

  componentWillMount() {
    // Get the id from the url
    const id = this.props.match.params.id;
    console.log(id);
    let noteData;
    // If id is defined go to reading state
    if (id) {
      noteData = this.getNote(id);
      // if there is no data with provided id
      if (!noteData) {
        // redirect to home page
        this.setState({ redirect: true });
        // stop the function from executing
        return;
      }
      this.readState();
    }
    // Otherwise make new note and go to edit state
    else {
      noteData = new NoteData("", "");
      // replace the path 
      this.props.history.replace(`/note/${noteData.id}`);
      this.newNote();
    }

    this.setState({
      noteData,
      title: noteData.title,
      body: noteData.body
    });
  }

  // define when to block navigation
  when = () =>{
    const {state, newNote} = this.state;
    const editing = (state === noteState.EDITING && this.changesMade());
    const nNote = (newNote && this.changesMade());
    return (editing || nNote);
  }

  // define what to do when navigation is blocked
  onBlock = () =>{
    // this.saveNote();
    this.props.openModal({
      yesCallback: this.saveNote,
      title: 'Unsaved changes',
      message: 'Save changes before leaving?'
    })
  }

  notEmpty = () =>{
    const { title, body } = this.state;
    return ( title !== '' || body !== '');
  }

  changesMade = () =>{
    const { noteData, title, body } = this.state;
    return ( noteData.body !== body || noteData.title !== title );
  }

  getNote = (id) => {
    const { notes } = this.props;
    return notes.find(note => note.id === id);
  }

  readState = () => {
    this.setState({
      state: noteState.READING
    });
  }

  editState = () => {
    this.setState({
      state: noteState.EDITING
    });
  }

  newNote = () => {
    this.setState({
      newNote: true,
      state: noteState.EDITING
    });
  }

  saveNote = () => {
    const { noteData, title, body, newNote } = this.state;
    // if a change has ocured proceede
    if (!(noteData.title === title && noteData.body === body)) {
      noteData.title = title;
      noteData.body = body;
      noteData.mTime = new Date();
      this.setState({
        undo: false
      });
      // check if it is a new note
      if (newNote) {
        this.props.createNote(noteData);
        this.setState({
          newNote: false
        });
      } else {
        this.props.updateNote(noteData);
      }
      this.props.showMessage('Note Saved');
    }
    // go to reading state
    this.readState();
  }

  editNote = () => {
    this.editState();
    this.bodyInput.focus();
  }

  undoChanges = () => {
    const { noteData } = this.state;
    const title = noteData.title;
    const body = noteData.body;
    // reset to previously saved data
    this.setState({ title, body, undo: false });
  }

  noteUpdateHandler = (name) =>{
    const { noteData } = this.state;
    const noteDataState = NoteData.State();
    let state;
    switch(name){
      case ButtonName.ARCHIVE:
      state = noteDataState.archived;
      break;
      case ButtonName.DELETE:
      state = noteDataState.deleted;
      break;
      default:
      state = noteDataState.normal;
      break;
    }
    noteData.state = state;
    if(state === noteDataState.deleted){
      noteData.dTime = new Date();
      this.props.updateNote(noteData);
      this.props.unblock();
      this.props.history.goBack();
      return;
    }
    
    this.props.updateNote(noteData);
    // update local state;
    this.setState({noteData});
  }

  deleteNoteForever = () => {
    const { noteData } = this.state;
    this.props.deleteNote(noteData.id);
    this.props.unblock();
    this.props.history.push('/trash');
  }

  handleOnChange = (e) => {
    const { newNote } = this.state;
    const { title, body } = this.state.noteData;
    // get the name of the input that fired the event
    const name = e.target.getAttribute("name");
    const value = e.target.value;
    let undo = false;
    // look if undo button should be rendered
    if (!newNote) {
      switch (name) {
        case 'body':
          if (value !== body)
            undo = true;
          break;
        default:
          if (value !== title)
            undo = true;
          break;
      }
    }
    // update the state
    this.setState({
      [name]: value,
      undo
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect)
      return (
        <Redirect to="/" />
      );
    // get data from state
    const { noteData, title, body, state, undo, newNote } = this.state;
    // store component props
    const headerProps = {
      title,
      noteDataState: noteData.state,
      state,
      undo,
      onTitleChange: this.handleOnChange,
      saveNote: this.saveNote,
      editNote: this.editNote,
      openModal: this.openModalHandler
    }

    const infoProps = {
      state: (noteData.state === NoteData.State().deleted) ? noteData.state : state,
      cTime: noteData.cTime,
      mTime: noteData.mTime,
      dTime: noteData.dTime
    }

    const textAreaProps = {
      autoFocus: newNote ? true : false,
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "of",
      spellCheck:"false",
      name:"body",
      value: body,
      readOnly: state === noteState.READING,
      onChange: this.handleOnChange,
      ref: input => (this.bodyInput = input),
    }

    return (
      <React.Fragment>
        <Header {...headerProps} />
        <Section>
          <NoteInfo {...infoProps}/>
          <TextArea {...textAreaProps}/>
        </Section>
      </React.Fragment>
    );
  }
}

Note.propTypes = {
  notes: PropTypes.array.isRequired,
  createNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  notes: state.notes
});

const mapDispatchToProps = {
  createNote,
  deleteNote,
  updateNote
}

export default blockNavigation(messageControlls(openModalHandler(connect(mapStateToProps, mapDispatchToProps)(Note))));
