import { CREATE_NOTE, DELETE_NOTE, DELETE_ALL_NOTES ,UPDATE_NOTE, SET_SORT, SET_SORT_PAGE ,SET_VIEW } from '../actions/types';

const localStorageMiddleware = ({getState}) => { // <--- FOCUS HERE
  const interest = [CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE, DELETE_ALL_NOTES, SET_SORT, SET_VIEW, SET_SORT_PAGE];
  return (next) => (action) => {
      const result = next(action);
      const type = result.type;
      const index = interest.indexOf(type);
      if(index !== -1){ 
        console.log("Local storage middleware");
        localStorage.setItem('applicationState', JSON.stringify(
            getState()
        ));
      }
      return result;
  };
};

function reviver(key, value) {
  if (key === "cTime" || key === "mTime" || key === "dTime") {
    return new Date(value);
  }
  return value;
}

export const reHydrateStore = () => { // <-- FOCUS HERE
  console.log("Inital state");
  if (localStorage.getItem('applicationState') !== null) {
      return JSON.parse(localStorage.getItem('applicationState'),reviver) // re-hydrate the store

  }
}

export default localStorageMiddleware;