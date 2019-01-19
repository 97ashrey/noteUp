/**
 * Persist redux state to local storage
 */
import { CREATE_NOTE, DELETE_NOTE, MODIFY_NOTE, ARCHIVE_NOTE, RESTORE_NOTE, DELETE_NOTE_PERMANENTLY, CLEAR_TRASH, SET_SORT, SET_SORT_PAGE ,SET_VIEW } from '../actions/types';

const localStorageMiddleware = ({getState}) => { // <--- FOCUS HERE
  const interest = [CREATE_NOTE, DELETE_NOTE, MODIFY_NOTE, ARCHIVE_NOTE, RESTORE_NOTE, DELETE_NOTE_PERMANENTLY, CLEAR_TRASH, SET_SORT, SET_VIEW, SET_SORT_PAGE];
  return (next) => (action) => {
      const result = next(action);
      const type = result.type;
      const index = interest.indexOf(type);
      if(index !== -1){ 
        // console.log("Local storage middleware");
        const state = {...getState()};
        // remove selectionMode from state
        delete state.selectionMode;
        localStorage.setItem('applicationState', JSON.stringify(
            state
        ));
      }
      return result;
  };
};

// restores serialized date objects
function reviver(key, value) {
  if (key.includes("Time")) {
    return new Date(value);
  }
  return value;
}

export const reHydrateStore = () => { // <-- FOCUS HERE
  console.log("Inital state");
  if (localStorage.getItem('applicationState') !== null) {
    // re-hydrate the store  
    return JSON.parse(localStorage.getItem('applicationState'),reviver) 
  }
}

export default localStorageMiddleware;