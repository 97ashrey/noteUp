import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { createNote, deleteNote, updateNote } from '../../actions/notesActions';

import Section from '../../components/Section';
import Header from './components/header';
import NoteInfo from './components/note-info'
import TextArea from './components/TextArea';
import Message from './components/Message';

import Modal from '../../components/Modal';

import NoteData from '../../entities/NoteData';
import { noteState, name as BtnName } from './services/constants';

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
      message: '',
      modal: {
        open: false,
        yesCallback: null,
        noCallBack: null,
        title: '',
        message: ''
      }
    }
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

  componentDidMount() {
    this.unblock = this.props.history.block(() => {
      const { state, modal, newNote } = this.state;
      const when = (!newNote && state === noteState.EDITING) || (modal.open);
      if (when) {
        if (!newNote && state === noteState.EDITING) {
          this.saveNote();
        }
        else if (modal.open) {
          this.closeModal();
        }
      }
      return !when;
    });
  }

  // block leaving the page
  componentWillUnmount() {
    this.unblock();
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

  getNote = (id) => {
    const { notes } = this.props;
    return notes.find(note => note.id === id);
  }

  showMessage = (message) => {
    this.setState({ message });
    setTimeout(() => {
      this.setState({ message: '' });
    }, 1000)
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
      this.showMessage('Note Saved');
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

  deleteNote = () => {
    const { noteData } = this.state;
    noteData.state = NoteData.State().deleted;
    noteData.dTime = new Date();
    this.props.updateNote(noteData);
    this.unblock();
    this.props.history.goBack();
  }

  deleteNoteForever = () => {
    const { noteData } = this.state;
    this.props.deleteNote(noteData.id);
    this.unblock();
    this.props.history.push('/trash');
  }

  restoreNote = () => {
    const { noteData } = this.state;
    noteData.state = NoteData.State().normal;
    this.props.updateNote(noteData);
  }

  archiveNote = () => {
    const { noteData } = this.state;
    noteData.state = NoteData.State().archived;
    this.props.updateNote(noteData);
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

  findName = (element) => {
    while (true) {
      const value = element.getAttribute('name');
      if (value) {
        return value;
      }
      element = element.parentElement;
    }
  }

  openModal = (data) => {
    const { modal } = this.state;
    modal.open = true;
    for (let key in data) {
      modal[key] = data[key];
    }
    this.setState({ modal });
  }

  openModalHandler = (e) => {
    const name = this.findName(e.target);
    switch (name) {
      case BtnName.DELETE:
        this.openModal({
          yesCallback: this.deleteNote,
          noCallBack: null,
          title: 'Delete',
          message: 'Move note to the trash can?'
        });
        break;
      case BtnName.DELETE_FOREVER:
        this.openModal({
          yesCallback: this.deleteNoteForever,
          noCallBack: null,
          title: 'Permanently delete',
          message: 'Permanently delete note?'
        });
        break;
      case BtnName.RESTORE:
        this.openModal({
          yesCallback: this.restoreNote,
          noCallBack: null,
          title: 'RESTORE',
          message: 'Do you want to restore note?'
        });
        break;
      case BtnName.UNDO:
        this.openModal({
          yesCallback: this.undoChanges,
          noCallBack: null,
          title: 'Undo',
          message: 'Undo changes?'
        });
        break;
      case BtnName.ARCHIVE:
        this.openModal({
          yesCallback: this.archiveNote,
          noCallBack: null,
          title: 'Archive',
          message: 'Archive note?'
        });
        break;
      case BtnName.UNARCHIVE:
        this.openModal({
          yesCallback: this.restoreNote,
          noCallBack: null,
          title: 'Unarchive',
          message: 'Unarchive note?'
        });
        break;
      default:
        break;
    }
  }

  closeModal = () => {
    const { modal } = this.state;
    modal.open = false;
    this.setState({
      modal
    })
  }

  render() {
    const { redirect } = this.state;
    if (redirect)
      return (
        <Redirect to="/" />
      );


    const { noteData, title, body, state, undo, newNote, message, modal } = this.state;

    const btnFunctions = {
      saveNote: this.saveNote,
      editNote: this.editNote,
      openModal: this.openModalHandler
    }

    const infoState = (noteData.state === NoteData.State().deleted) ? noteData.state : state;

    const infoTime = {
      cTime: noteData.cTime,
      mTime: noteData.mTime,
      dTime: noteData.dTime
    }
    return (
      <React.Fragment>
        <Header title={title}
          noteDataState={noteData.state}
          state={state}
          undo={undo}
          btnFunctions={btnFunctions}
          onTitleChange={this.handleOnChange} />


        <Section>
          <NoteInfo state={infoState}
            time={infoTime}
          />
          <TextArea 
            autoFocus={newNote ? true : false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="of"
            spellCheck="false"
            name="body" value={body}
            readOnly={state === noteState.READING}
            onChange={this.handleOnChange}
            ref={input => (this.bodyInput = input)} />
        </Section>

        <Modal
          handleClose={this.closeModal}
          data={modal}
        />
        {(message !== '') ? <Message>{message}</Message> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Note);
