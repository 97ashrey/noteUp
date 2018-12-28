import React from 'react'
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import NoteLink from './components/NoteLink';
import VCenter from '../VCenter';
import Delete from '@material-ui/icons/Delete';

import NoteData from '../../entities/NoteData';
 
import { moreThanDay, parseMonthDate, parseHours } from '../../services/time';

NoteItem.propTypes = {
  noteData: PropTypes.object.isRequired,
}

function NoteItem({noteData, ...restProps}) {
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
        <span style={{width: '60px'}}>{moreThanDay(cTime) ? parseMonthDate(cTime) : parseHours(cTime)}</span>
    );
  }

  function preventContextMenu(e){
    e.preventDefault();
  }
 
  return (
    <NoteLink 
      onContextMenu={preventContextMenu}
      component={Link} to={path}
      selected={selected} 
      draggable={false} 
      {...restProps}>
      <span>{(body !== '')? body.substr(0,10): title.substr(0,10)}</span>
      {getTime()}
    </NoteLink>
  )
}

export default NoteItem; 