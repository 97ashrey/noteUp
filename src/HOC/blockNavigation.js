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
      this.unblock = this.props.history.block((nextLocation) => {
        const when = this.state.when();
        if (when) {
          this.state.onBlock();
          this.nextLocation = nextLocation;
        }
        return !when;
      });
    }

    componentWillUnmount(){
      this.unblock();
    }

    continueNavigation = () =>{
      this.unblock();
      this.props.history.push(this.nextLocation.pathname);
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
        console.error(`onBlock argument needs to be a function`);
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
                          continueNavigation={this.continueNavigation}
                          {...this.props} />
      );
    }
  }

  return withRouter(BlockNavigation);
}

export default blockNavigation;