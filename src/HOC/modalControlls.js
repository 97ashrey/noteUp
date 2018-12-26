import React, { Component } from 'react';

import Modal from '../components/Modal';

function withModalControlls(WrappedComponent){

  return class ModalControlls extends Component{

    constructor(props){
      super(props);
      this.state={
        modal: {
          open: false,
          yesCallback: null,
          noCallback: null,
          title: '',
          message: ''
        }
      }
    }

    openModal = (data) => {
      const { modal } = this.state;
      modal.open = true;
      for (const key in data) {
        modal[key] = data[key];
      }
      this.setState({ modal });
    }

    closeModal = () =>{
      const { modal } = this.state;
      modal.open = false;
      this.setState({modal});
    }

    modalOpened = () =>{
      return this.state.modal.open;
    }

    render(){
      const { modal } = this.state;
      modal.handleClose = this.closeModal;
      return(
        <React.Fragment>
          <WrappedComponent closeModal={this.closeModal} openModal={this.openModal}
            modalOpened={this.modalOpened}
            {...this.props}/>
          <Modal {...modal}/>
        </React.Fragment>
      );
    }
  }
}

export default withModalControlls;