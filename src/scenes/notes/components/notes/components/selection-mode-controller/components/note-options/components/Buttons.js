import React from 'react';
import styled from 'styled-components';
import IconButton ,{ iconType } from '../../../../../../../../../components/IconButton';
import { page as Page, ButtonName } from '../../../../../../../../../services/constants';

const ButtonWrapper  = styled.div`
  flex: 1;
  height: 100%;
  && > *{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

function Buttons({page, clickHandler}){

  function ArchiveButton(){
    return (
      <IconButton 
        block 
        icon={iconType.archive} 
        color="inherit"
        name={ButtonName.ARCHIVE}
        onClick={clickHandler}/>
    );
  }

  function UnArchiveButton(){
    return (
      <IconButton 
        block 
        icon={iconType.unArchive} 
        color="inherit"
        name={ButtonName.UNARCHIVE}
        onClick={clickHandler}/>
    );
  }

  function RestoreButton(){
    return (
      <IconButton 
        block 
        icon={iconType.undo} 
        color="inherit" 
        name={ButtonName.RESTORE}
        onClick={clickHandler}/>
    );
  }

  function DeleteForeverButton(){
    return (
      <IconButton 
        block 
        icon={iconType.deleteForever} 
        color="inherit" 
        name={ButtonName.DELETE_FOREVER}
        onClick={clickHandler}/>
    );
  }

  function DeleteButton(){
    return (
      <IconButton 
        block 
        icon={iconType.delete} 
        color="inherit" 
        name={ButtonName.DELETE}
        onClick={clickHandler}/>
    );
  }

  const UIElements = {
    btns: []
  };

  switch(page){
    case Page.main:
    UIElements.btns.push(ArchiveButton());
    UIElements.btns.push(DeleteButton());
    break;
    case Page.archive:
    UIElements.btns.push(UnArchiveButton());
    UIElements.btns.push(DeleteButton());
    break;
    default:
    UIElements.btns.push(RestoreButton());
    UIElements.btns.push(DeleteForeverButton());
  }

  const {btns} = UIElements
  return(
    <React.Fragment>
      {btns.map((btn,index) =>
        <ButtonWrapper key={index}>
          {btn}
        </ButtonWrapper>
      )}
    </React.Fragment>
  );
}

export default Buttons;