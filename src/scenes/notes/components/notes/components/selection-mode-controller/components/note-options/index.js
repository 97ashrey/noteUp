/**
 * Component handles deleting, archving ... of the selected notes
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { archiveNote, restoreNote, deleteNote, deleteNotePermanently } from '../../../../../../../../actions/notesActions';

import OptionsWrapper from './components/OptionsWrapper';
import openModalHandler from '../../../../../../../../HOC/openModalHandler';

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
        yesCallback: ()=>{this.noteUpdateHandler(DELETE_FOREVER)},
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
    const {getSelectedNotes, exit, archiveNote, deleteNote, restoreNote, deleteNotePermanently } = this.props;
    const notes = getSelectedNotes();
    let action;
    switch(name){
      case ButtonName.ARCHIVE:
      action = archiveNote;
      break;
      case ButtonName.DELETE:
      action = deleteNote;
      break;
      case ButtonName.DELETE_FOREVER:
      action = deleteNotePermanently
      break;
      default:
      action = restoreNote;
      break;
    }
    notes.forEach(note =>{
      action(note.id);
    });
    exit();
  }

  render(){
    const {page} = this.props;

    const buttonsProps = {
      page,
      clickHandler: this.openModalHandler
    }
    return(
      <OptionsWrapper>
        <Buttons {...buttonsProps} />
      </OptionsWrapper>
    );
  }
}

const mapDispatchToProps = {
  archiveNote, 
  restoreNote, 
  deleteNote, 
  deleteNotePermanently
}

export default openModalHandler(connect(null,mapDispatchToProps)(NoteOptions));