import React from 'react';

import SelectionControlls from './components/selection-controlls';
import NoteOptions from './components/note-options';

function SelectionModeController({getSelectedNotes, page, exit, ...selectionControlls}){
  return (
    <React.Fragment>
      <SelectionControlls exit={exit} bgcolor="#ddd" {...selectionControlls}/>
      <NoteOptions getSelectedNotes={getSelectedNotes} bgColor="#ddd" page={page} exit={exit}/>
    </React.Fragment>
  )
}

export default SelectionModeController;
