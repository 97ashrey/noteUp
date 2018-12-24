import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateNote, deleteNote } from '../../../../../../../../actions/notesActions';

import OptionsWrapper from './components/OptionsWrapper';
import Modal from '../../../../../../../../components/Modal';

import NoteData from '../../../../../../../../entities/NoteData';
import { ButtonName } from '../../../../../../../../services/constants';

import Buttons from './components/Buttons';
class NoteOptions extends Component{

  constructor(props){
    super(props);
    this.state={
      modal: {
        open: false,
        yesCallback: null,
        noCallBack: null,
        title: '',
        message: ''
      }
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

  closeModal = () => {
    const { modal } = this.state;
    modal.open = false;
    this.setState({
      modal
    })
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

  noteUpdateHandler = (name) =>{
    const {getSelectedNotes, updateNote ,exit} = this.props;
    const notes = getSelectedNotes();
    const noteDataState = NoteData.State();
    let state;
    switch(name){
      case ButtonName.ARCHIVE:
      state = noteDataState.archived;
      break;
      default:
      state = noteDataState.normal;
      break;
    }
    notes.forEach(note =>{
      note.state = state;
      updateNote(note);
    });
    exit();
  }

  deleteNotes = () =>{
    const {getSelectedNotes, updateNote ,exit} = this.props;
    const notes = getSelectedNotes();
    notes.forEach(note =>{
      note.dTime = new Date();
      note.state = NoteData.State().deleted;
      updateNote(note);
    });
    exit();
  }

  premanentlyDelete = () =>{
    const {getSelectedNotes, deleteNote, exit} = this.props;
    const notes = getSelectedNotes();
    notes.forEach(note =>{
      deleteNote(note.id);
    });
    exit();
  }

  

  openModalHandler = (e) => {
    const name = this.findName(e.target);
    const noteUpdateHandler = this.noteUpdateHandler.bind(this,name);
    switch (name) {
      case ButtonName.DELETE:
        this.openModal({
          yesCallback: this.deleteNotes,
          noCallBack: null,
          title: 'Delete',
          message: 'Move selected notes to the trash can?'
        });
        break;
      case ButtonName.DELETE_FOREVER:
        this.openModal({
          yesCallback: this.premanentlyDelete,
          noCallBack: null,
          title: 'Permanently delete',
          message: 'Permanently delete slected notes?'
        });
        break;
      case ButtonName.RESTORE:
        this.openModal({
          yesCallback: noteUpdateHandler,
          noCallBack: null,
          title: 'RESTORE',
          message: 'Do you want to restore selected notes?'
        });
        break;
      case ButtonName.ARCHIVE:
        this.openModal({
          yesCallback: noteUpdateHandler,
          noCallBack: null,
          title: 'Archive',
          message: 'Archive selected notes?'
        });
        break;
      case ButtonName.UNARCHIVE:
        this.openModal({
          yesCallback: noteUpdateHandler,
          noCallBack: null,
          title: 'Unarchive',
          message: 'Unarchive selected notes?'
        });
        break;
      default:
        break;
    }
  }

  render(){
    const {page} = this.props;
    const {modal} = this.state;

    modal.handleClose = this.closeModal;

    const buttonsProps = {
      page,
      clickHandler: this.openModalHandler
    }
    return(
      <React.Fragment>
        <OptionsWrapper>
          <Buttons {...buttonsProps} />
        </OptionsWrapper>
        <Modal {...modal}/>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  updateNote,
  deleteNote
}

export default connect(null,mapDispatchToProps)(NoteOptions);