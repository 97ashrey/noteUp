import React from 'react';

import PropTypes from 'prop-types';
import {default as IButton} from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
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
import Done from '@material-ui/icons/Done';
import BorderClear from '@material-ui/icons/BorderClear';

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
  arrowBack: "ARROW_BACK",
  done: "DONE",
  borderClear: 'BORDER_CLEAR'
}

IconButton.propTpes= {
  icon: PropTypes.oneOf(Object.values(iconType)).isRequired
}

function IconButton ({icon, block, ...restProps}){
  let i;
  switch (icon) {
    case iconType.borderClear:
    i = <BorderClear/>
    break;
    case iconType.done:
    i = <Done/>
    break;
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
    case iconType.undo:
      i = <Undo />
    break;
    default:
      break;
  }
  return(
    (block === true)?
    <Button {...restProps}>
      {i}
    </Button>
    :
    <IButton {...restProps}>
      {i}
    </IButton>
  );
}

export default IconButton;