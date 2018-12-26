import React from 'react'

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';

import ListItemLink from './ListItemLink';


function NavList()  {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default NavList;
