import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateNote, deleteNote } from '../../../../../../../../actions/notesActions';

import OptionsWrapper from './components/OptionsWrapper';
import openModalHandler from '../../../../../../../../HOC/openModalHandler';

import NoteData from '../../../../../../../../entities/NoteData';
import { ButtonName } from '../../../../../../../../services/constants';

import Buttons from './components/Buttons';
class NoteOptions extends Component{

  constructor(props){
    super(props);
    
    const { DELETE, DELETE_FOREVER, RESTORE, ARCHIVE, UNARCHIVE } = ButtonName;
    const handler = {
      [DELETE] : {
        yesCallback: ()=>{this.noteUpdateHandler(DELETE)},
        title: 'Delete',
        message: 'Move selected notes to the trash can?'
      },
      [DELETE_FOREVER] : {
        yesCallback: this.premanentlyDelete,
        title: 'Permanently delete',
        message: 'Permanently delete slected notes?'
      },
      [RESTORE] : {
        yesCallback: ()=>{this.noteUpdateHandler(RESTORE)},
        title: 'RESTORE',
        message: 'Do you want to restore selected notes?'
      },
      [ARCHIVE] : {
        yesCallback: ()=>{this.noteUpdateHandler(ARCHIVE)},
        title: 'Archive',
        message: 'Archive selected notes?'
      },
      [UNARCHIVE] : {
        yesCallback: ()=>{this.noteUpdateHandler(UNARCHIVE)},
        title: 'Unarchive',
        message: 'Unarchive selected notes?'
      }
    }
    this.openModalHandler = props.openModalHandler.bind(this,handler);
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
      case ButtonName.DELETE:
      state = noteDataState.deleted;
      break;
      default:
      state = noteDataState.normal;
      break;
    }
    notes.forEach(note =>{
      note.state = state;
      if(state === noteDataState.deleted)
        note.dTime = new Date();
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

  render(){
    const {page , bgcolor} = this.props;

    const buttonsProps = {
      page,
      clickHandler: this.openModalHandler
    }
    return(
      <React.Fragment>
        <OptionsWrapper bgcolor={bgcolor}>
          <Buttons {...buttonsProps} />
        </OptionsWrapper>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  updateNote,
  deleteNote
}

export default openModalHandler(connect(null,mapDispatchToProps)(NoteOptions));