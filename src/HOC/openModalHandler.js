/**
 * Higher order component that provides a method for opening modal window
 * when user presses delete, undo, archive button etc..
 * All of these actions result in a modal opening with their specific actions
 * on yes and no button clicks. 
 */

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

    /**
     * This method was created with intention to pass handler argument when
     * function is binded in the component that needs it.
     * Depending on the name attribute of the button that was clicked, modal window * will open.
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