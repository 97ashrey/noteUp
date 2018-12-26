import React from 'react';

import SelectionControlls from './components/selection-controlls';
import NoteOptions from './components/note-options';

function SelectionModeController({getSelectedNotes, page, exit, ...selectionControlls}){

  const bgColor = "#ddd";
  return (
    <React.Fragment>
      <SelectionControlls bgcolor={bgColor} exit={exit} {...selectionControlls}/>
      <NoteOptions bgcolor={bgColor} getSelectedNotes={getSelectedNotes} page={page} exit={exit}/>
    </React.Fragment>
  )
}

export default SelectionModeController;
