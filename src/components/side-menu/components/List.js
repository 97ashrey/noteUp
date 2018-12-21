import React, { Component } from 'react'

import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';

function ListItemLink(props) {
  const { primary, to, icon } = props;
  return (
    <li>
      <ListItem button component={Link} to={to}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

class NavList extends Component {
  render() {
    return (
      <div style={{ width: '250px' }}>
        <List component="nav">
          <ListItemLink to="/" primary="Notes" icon={<AssignmentIcon />} />
          <ListItemLink to="/archive" primary="Archive" icon={<ArchiveIcon />} />
          <ListItemLink to="/trash" primary="Trash Can" icon={<DeleteIcon />} />
          <ListItemLink to="/search" primary="Search" icon={<SearchIcon />} />
        </List>
        <Divider />
        <List component="nav">
          <ListItemLink to="/about" primary="About" icon={<InfoIcon />} />
        </List>
      </div>
    )
  }
}

export default NavList;
