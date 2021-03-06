/**
 * This component is responsible for displaying various informations of the note,
 * such as time of its creation, time since last modification, and indicators for 
 * when user is editing the note.
 */
import React from 'react';
import PropTypes from 'prop-types';

import InfoWrapper from './components/InfoWrapper';
import VCenter from '../../../../components/VCenter';
import Delete from '@material-ui/icons/Delete';
import {noteState } from '../../services/constants';

import { getTimePassed, parseDate, parseHours, parseMonthDate } from '../../../../services/time';
import NoteData from '../../../../entities/NoteData';

NoteInfo.propTypes = {
  state: PropTypes.oneOf([noteState.EDITING, noteState.READING, NoteData.State().deleted]),
  mTime: PropTypes.instanceOf(Date).isRequired,
  dTime: PropTypes.instanceOf(Date).isRequired,
  cTime: PropTypes.instanceOf(Date).isRequired,
}

export default function NoteInfo({state, mTime, cTime, dTime}) {

  // get how much time has passed since last modification
  function getTimeSinceLastModification() {
    const { hours, minutes, seconds } = getTimePassed(mTime);
    if (hours > 0) {
      if (hours > 24) {
        return parseMonthDate(mTime);
      }
      return  (hours === 1)? `${hours} hour ago`:`${hours} hours ago`;
    }
    else if (minutes > 0) {
      return (minutes === 1)? `${minutes} minute ago`:`${minutes} minutes ago`;
    }
    else {
      return (seconds === 1)? `${seconds} second ago`:`${seconds} seconds ago`;
    }
  }

  function getDate(){
    return (
        (state === NoteData.State().deleted)?
        
        (<VCenter>
          <Delete />
          {parseDate(dTime) + " " + parseHours(dTime)}
        </VCenter>)
        :
        <span>{parseDate(cTime) + " " + parseHours(cTime)}</span>
      );
  }

  let info;
  switch (state) {
    case noteState.READING:
      info = getTimeSinceLastModification();
      break;
    case noteState.EDITING:
      info = "Editing";
      break;
    default:
      info = 'Trash'
    break;
  }
  return (
    <InfoWrapper>
      <span>{info}</span>
      {getDate()}
    </InfoWrapper>
  );
}
