import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = (props)=>{
  const { handleClose } = props
  const { open, title, message ,yesCallback, noCallback } = props.data;
  
  function yesClick(){
    if(yesCallback){
      yesCallback();
    }
    handleClose();
  }

  function noClick(){
    if(noCallback){
      noCallback();
    }
    handleClose();
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description" >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={yesClick} color="primary">
        Yes
      </Button>
      <Button onClick={noClick} color="primary" autoFocus>
        No
      </Button>
    </DialogActions>
  </Dialog>
  );
}

export default Modal;