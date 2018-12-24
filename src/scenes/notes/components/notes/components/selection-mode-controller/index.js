import React from 'react';

import SelectionControlls from './components/SelectionControlls';
import NoteOptions from './components/note-options';

function SelectionModeController({getSelectedNotes, page, exit, ...selectionControlls}){
  return (
    <React.Fragment>
      <SelectionControlls exit={exit} {...selectionControlls}/>
      <NoteOptions getSelectedNotes={getSelectedNotes} page={page} exit={exit}/>
    </React.Fragment>
  )
}

export default SelectionModeController;
