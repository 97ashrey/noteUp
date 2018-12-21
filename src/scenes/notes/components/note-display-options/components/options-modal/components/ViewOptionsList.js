import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { setView } from '../../../../../../../actions/noteViewActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList';
import BorderAllIcon from '@material-ui/icons/BorderAll';

import { viewType } from '../../../../../../../services/constants';

class ViewOptionsList extends Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  listClick = (name) =>{
    const {clickCallback, setView} = this.props;
    setView(name);
    clickCallback();
  }

  render(){

    return(
      <List>
      <ListItem button onClick={this.listClick.bind(this,viewType.list)}>
        <ListItemIcon>
          <ViewListIcon/>
        </ListItemIcon>
        <ListItemText primary="List"/>
      </ListItem>
      <ListItem button onClick={this.listClick.bind(this,viewType.grid)}>
        <ListItemIcon>
          <BorderAllIcon/>
        </ListItemIcon>
        <ListItemText primary="Grid"/>
      </ListItem>
    </List>
    );
  }
}

const mapDispatchToProps = {
  setView
}

export default connect(null,mapDispatchToProps)(ViewOptionsList);