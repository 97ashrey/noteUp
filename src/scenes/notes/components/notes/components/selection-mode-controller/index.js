import React from 'react';
import PropTypes from 'prop-types';
import SelectionControlls from './components/selection-controlls';
import NoteOptions from './components/note-options';

import { page } from '../../../../../../services/constants';

SelectionModeController.propTypes = {
  page: PropTypes.oneOf(Object.values(page)).isRequired,
  getSelectedNotes: PropTypes.func.isRequired,
  exit: PropTypes.func.isRequired,
  count: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  selectAll: PropTypes.func.isRequired
}

function SelectionModeController({getSelectedNotes, page, exit, ...selectionControlls}){

  return (
    <React.Fragment>
      <SelectionControlls exit={exit} {...selectionControlls}/>
      <NoteOptions getSelectedNotes={getSelectedNotes} page={page} exit={exit}/>
    </React.Fragment>
  )
}

export default SelectionModeController;
