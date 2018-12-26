import React, { Component } from 'react';

import Message from '../components/Message';

function messageControlls(WrappedComponent){
  
  class MessageControlls extends Component{
    constructor(props){
      super(props);

      this.state = {
        message: ''
      }
    }

    showMessage = (message) =>{
      this.setState({
        message
      })
      setTimeout(()=>{
        this.setState({
          message: ''
        });
      },1000);
    }

    render(){
      const { message } = this.state;
      return (
          <React.Fragment>
            <WrappedComponent  showMessage={this.showMessage} {...this.props}/>
            {(message !== '') && <Message>{message}</Message> }
          </React.Fragment>
        );
    }
  }

  return MessageControlls;
}

export default messageControlls;