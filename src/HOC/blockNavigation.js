import React , { Component } from 'react';
import { withRouter } from 'react-router';

function blockNavigation(WrappedComponent){

  class BlockNavigation extends Component{
    constructor(props){
      super(props);

      this.state = {
        when: () => false,
        onBlock: () => false
      }
    }

    componentDidMount(){
      this.unblock = this.props.history.block(() => {
        const when = this.state.when();
        if (when) {
          this.state.onBlock();
        }
        return !when;
      });
    }

    componentWillUnmount(){
      this.unblock();
    }

    setWhen = (when) =>{
      if(!(typeof when === 'function')){
        console.error(`when argument needs to be a function`);
        return;
      }
      this.setState({
        when
      });
    }

    setOnBlock = (onBlock) =>{
      if(!(typeof onBlock === 'function')){
        console.error(`when argument needs to be a function`);
        return;
      }
      this.setState({
        onBlock
      });
    }

    render (){
      return(
        <WrappedComponent setWhen={this.setWhen} 
                          setOnBlock={this.setOnBlock}
                          unblock={this.unblock}
                          {...this.props} />
      );
    }
  }

  return withRouter(BlockNavigation);
}

export default blockNavigation;