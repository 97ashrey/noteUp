import React, { Component } from 'react';
import withModalControlls from './modalControlls';

// import { ButtonName } from '../services/constants';

function openModalHandler(WrappedComponent) {

  class Handler extends Component {

    findName = (element) => {
      while (true) {
        const value = element.getAttribute('name');
        if (value) {
          return value;
        }
        element = element.parentElement;
      }
    }

    /* this method was created with intetion so that handler object can be passed
    *  when this functions is binded
    */
    openModalHandler = (handler,event) => {
      const { openModal } = this.props;
      const name = this.findName(event.target);
      if(!(name in handler)){
        console.error(`There is no handler with name "${name}" in ${handler}`);
        return;
      } 
      openModal(handler[name]);
    }

    render() {
      return (
        <WrappedComponent openModalHandler={this.openModalHandler} {...this.props}/>
      );
    }
  }

  return withModalControlls(Handler);

}

export default openModalHandler;