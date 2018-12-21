import React from 'react';

import PropTypes from 'prop-types';
import {default as IButton} from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Save from '@material-ui/icons/Save';
import Undo from '@material-ui/icons/Undo';
import Archive from '@material-ui/icons/Archive';
import UnArchive from '@material-ui/icons/Unarchive';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';

export const iconType = {
  save: "SAVE",
  edit: "EDIT",
  delete: "DELETE",
  deleteForever: "DELETE_FOREVER",
  undo: "UNDO",
  archive: "ARCHIVE",
  unArchive: "UNARCHIVE",
  add: "ADD",
  search: "SEARCH",
  menu: "MENU",
  arrowBack: "ARROW_BACK"
}

IconButton.propTpes= {
  icon: PropTypes.string.isRequired
}

function IconButton ({icon, ...restProps}){
  let i;
  switch (icon) {
    case iconType.arrowBack:
    i = <ArrowBack/>
    break;
    case iconType.menu:
    i = <MenuIcon/>
    break;
    case iconType.save:
      i = <Save />
      break;
    case iconType.edit:
      i = <Edit />
      break;
    case iconType.delete:
      i = <Delete />
      break;
    case iconType.deleteForever:
      i = <DeleteForever />
      break;
    case iconType.archive:
      i = <Archive />
      break;
    case iconType.unArchive:
      i = <UnArchive />
      break;
    case iconType.search:
      i = <SearchIcon/>
      break;
    case iconType.add:
      i = <AddIcon/>
      break;
    default:
      i = <Undo />
      break;
  }
  return(
    <IButton {...restProps}>
      {i}
    </IButton>
  );
}

export default IconButton;