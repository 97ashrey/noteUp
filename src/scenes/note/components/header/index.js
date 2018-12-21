import React from 'react';
import PropTypes from 'prop-types';

import HeaderWrapper from '../../../../components/HeaderWrapper';
import Input from '@material-ui/core/Input';
import BackButton from '../../../../components/BackButton';
import IconButton, {iconType} from '../../../../components/IconButton';
import NoteTitle from './components/NoteTitle';

import { noteState, name } from '../../services/constants';
import NoteData from '../../../../entities/NoteData';

function Header(props) {
  // get the props
  const { title, state, onTitleChange, undo, noteDataState } = props;
  const { saveNote, editNote, openModal } = props.btnFunctions;
  // store ui elements
  const UIElements = {
    noteTitle: null,
    btns: []
  };

  function EditButton(){
    return (
      <IconButton
        icon={iconType.edit}
        color="inherit"
        key="Edit"
        onClick={editNote}/>
    );
    
  }

  function DeleteButton(){
    return (
      <IconButton
        icon={iconType.delete}
        name={name.DELETE}
        color="inherit"
        key="Delete"
        onClick={openModal}/>
    );
  }

  function DeleteForeverButton(){
    return(
      <IconButton
        icon={iconType.deleteForever}
        name={name.DELETE_FOREVER}
        color="inherit"
        key="Delete_Forever"
        onClick={openModal}  />
    );
  }

  function SaveButton(){
    return (
      <IconButton
        icon={iconType.save}
        color="inherit"
        key="Save"
        onClick={saveNote}/>
    );
  }

  function ArchiveButton(){
    return (
      <IconButton
        icon={iconType.archive}
        name={name.ARCHIVE}
        color="inherit"
        key="Archive"
        onClick={openModal}/>
    );
  }

  function UnArchiveButton(){
    return (
      <IconButton
        icon={iconType.unArchive}
        name={name.UNARCHIVE}
        color="inherit"
        key="Archive"
        onClick={openModal}/>
    );
  }

  function UndoButton(){
    return (
      <IconButton
      icon={iconType.undo}
      name={name.UNDO}
      color="inherit"
      key="Undo"
      onClick={openModal}/>
      );
  }

  function RestoreButton(){
    return (
    <IconButton
      icon={iconType.undo}
      name={name.RESTORE}
      color="inherit"
      key="RESTORE"
      onClick={openModal} />);
  }

  function TitleInput(){
    return(
      <Input
        style={{width: "30%"}}
        autoComplete="off"
        name="title"
        value={title}
        onChange={onTitleChange}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    );
  }

  function Title(){
    return (<NoteTitle>{title}</NoteTitle>);
  }

  // Decide what to render depending on note state
  switch(state){
    case noteState.READING:
      UIElements.noteTitle = Title();
      if(noteDataState === NoteData.State().deleted){
        UIElements.btns.push(RestoreButton());
        UIElements.btns.push(DeleteForeverButton());
      } else {
        UIElements.btns.push(EditButton());
        UIElements.btns.push(DeleteButton());
        (noteDataState === NoteData.State().archived)?
        UIElements.btns.push(UnArchiveButton()): UIElements.btns.push(ArchiveButton());
      }
      break;
    default:
      UIElements.noteTitle = TitleInput();
      UIElements.btns.push(SaveButton());
    break;
  }

  if(undo){
    UIElements.btns.push(UndoButton())
  }

  const { noteTitle, btns } = UIElements;
  const buttons = (<div style={{marginLeft: 'auto'}}>
                      {btns.map(btn => btn)}
                  </div>)
  
  return (
    <HeaderWrapper>
      <BackButton/>
        {noteTitle}
        {buttons}
    </HeaderWrapper>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  undo: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  noteDataState: PropTypes.string.isRequired,
  btnFunctions: PropTypes.object.isRequired
}

export default Header;