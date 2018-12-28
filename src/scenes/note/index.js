import React, { Component } from 'react'
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { createNote, deleteNote, modifyNote, archiveNote, restoreNote, deleteNotePermanently } from '../../actions/notesActions';

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

import {withTheme} from '@material-ui/core/styles';

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
    const {state} = this.state;
    return (state === noteState.EDITING && this.changesMade());
  }

  // define what to do when navigation is blocked
  onBlock = () =>{
    this.props.openModal({
      yesCallback: ()=>{
        this.saveOnExit();
        this.props.continueNavigation();
      },
      noCallback: this.props.continueNavigation,
      title: 'Unsaved changes',
      message: 'Save changes before leaving?'
    })
  }

  readState = () => {
    this.setState({
      state: noteState.READING,
      undo: false
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

  changesMade = () =>{
    const { noteData, title, body } = this.state;
    return ( noteData.body !== body || noteData.title !== title );
  }

  getNote = (id) => {
    const { notes } = this.props;
    return notes.find(note => note.id === id);
  }

  saveOnExit = () =>{
    const { noteData, title, body, newNote } = this.state;
    if (newNote) {
      noteData.title = title;
      noteData.body = body;
      this.props.createNote(noteData);
    } else {
      this.props.modifyNote(noteData.id,{title,body});      
    }
  }

  // Button click handlers
  saveNote = () => {
    const { noteData, title, body, newNote } = this.state;
    // if a change has ocured proceede
    if (this.changesMade()) {
      // check if it is a new note
      if (newNote) {
        noteData.title = title;
        noteData.body = body;
        this.props.createNote(noteData);
        
        this.setState({
          newNote: false
        });
      } else {
        this.props.modifyNote(noteData.id,{title,body});
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
    const id = this.state.noteData.id;
    switch(name){
      case ButtonName.ARCHIVE:
       this.props.archiveNote(id);
      break;
      case ButtonName.DELETE:
        this.props.deleteNote(id);
        this.props.unblock();
        this.props.history.goBack();
      break;
      default:
        this.props.restoreNote(id);
      break;
    }
  }

  deleteNoteForever = () => {
    const id = this.state.noteData.id;
    this.props.deleteNotePermanently(id);
    this.props.unblock();
    this.props.history.push('/trash');
  }

  // input handler
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
    
    const headerProps = {
      title,
      noteDataState: noteData.state,
      state,
      newNote,
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
        <Section bgcolor={this.props.theme.palette.primary.light}>
          <NoteInfo {...infoProps}/>
          <TextArea {...textAreaProps}/>
        </Section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes
});

const mapDispatchToProps = {
  createNote,
  deleteNote,
  modifyNote,
  archiveNote,
  restoreNote,
  deleteNotePermanently
}

export default blockNavigation(messageControlls(openModalHandler(connect(mapStateToProps, mapDispatchToProps)(withTheme()(Note)))));
