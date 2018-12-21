import { combineReducers } from 'redux';
import notes from './notesReducer';
import view from './noteViewReducer';
import sort from './noteSortReducer';
export default combineReducers({
  notes,
  view,
  sort
});