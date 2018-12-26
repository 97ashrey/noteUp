import { combineReducers } from 'redux';
import notes from './notesReducer';
import view from './noteViewReducer';
import sort from './noteSortReducer';
import selectionMode from './selectionModeReducer';
export default combineReducers({
  notes,
  view,
  sort,
  selectionMode
});