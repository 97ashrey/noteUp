import React from 'react';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

Modal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  yesCallback: PropTypes.func,
  noCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

Modal.defaultProps = {
  open: false,
  yesCallback: null,
  noCallback: null
}

function Modal ({handleClose, open, title, message, yesCallback, noCallback}){
 
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