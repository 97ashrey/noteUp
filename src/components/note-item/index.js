import React from 'react'
import { Link } from 'react-router-dom';

import NoteLink from './components/NoteLink';
import VCenter from '../VCenter';
import Delete from '@material-ui/icons/Delete';

import NoteData from '../../entities/NoteData';
 
import { moreThanDay, parseMonthDate, parseHours } from '../../services/time';

function NoteItem(props) {
  const {noteData, ...restProps} = props;
  const { id, title, body, cTime, dTime, selected} = noteData;
  const path = `/note/${id}`;
  function getTime() {
    return (      
        (noteData.state === NoteData.State().deleted)?
          <VCenter width="70px">
            <Delete />
            {(moreThanDay(dTime)) ? parseMonthDate(dTime) : parseHours(dTime)}
        </VCenter>
        :
        <span style={{width: '50px'}}>{moreThanDay(cTime) ? parseMonthDate(cTime) : parseHours(cTime)}</span>
    );
  }

  function preventContextMenu(e){
    e.preventDefault();
  }
 
  return (
    <NoteLink 
      onContextMenu={preventContextMenu}
      component={Link} to={path}
      selected={selected} draggable={false} {...restProps}>
      { (body !== '')? <span>{body.substr(0,10)}</span> : <span>{title.substr(0,10)}</span>}
      {getTime()}
    </NoteLink>
  )
}

export default NoteItem; 