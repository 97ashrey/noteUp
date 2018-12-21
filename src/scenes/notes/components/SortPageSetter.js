import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setSortPage} from '../../../actions/noteSortActions';

class SortPageSetter extends Component{

  componentWillMount(){
    const {sortPage,setSortPage} = this.props;
    setSortPage(sortPage);
  }

  render(){
    return <span></span>
  }
}

export default connect(null,{setSortPage})(SortPageSetter);