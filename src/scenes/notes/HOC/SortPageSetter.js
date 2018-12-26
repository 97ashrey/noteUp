import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setSortPage} from '../../../actions/noteSortActions';

const withSortPageSetter = (sortPage) => (WrappedComponent) => {
  class SortPageSetter extends Component{

    constructor(props){
      super(props);
      const {setSortPage} = props;
      setSortPage(sortPage);
      
    }

    render(){
      return <WrappedComponent {...this.props}/>
    }
  }

  return connect(null,{setSortPage})(SortPageSetter);
    
}

export default withSortPageSetter;