import { CREATE_NOTE, DELETE_NOTE, DELETE_ALL_NOTES, UPDATE_NOTE } from '../actions/types';

import NoteData from '../entities/NoteData';

// const initialState = [
//     new NoteData("Najveci naslov ikad osmisljen lmao","Tekstics neki")
//   ]
// initialState[0].id = "1";
const initialState = [];
export default function(state = initialState, action){

  function getIndex(id){
    return state.findIndex(note => note.id === id);
  }

  switch(action.type){
    case CREATE_NOTE:
      state.push(action.payload);
      return state;
    
      case DELETE_NOTE:
      return (()=>{
        const id = action.payload;
        const index = getIndex(id);
        if(index !== -1)
          state.splice(index,1); 
        return state;
      })();
   
    case DELETE_ALL_NOTES:
      return state.filter(note => note.state !== NoteData.State().deleted)
    
    case UPDATE_NOTE:
      return (()=>{
        const noteData = action.payload;
        const index = getIndex(noteData.id);
        if(index !== -1)
          state[index] = noteData;
        return state;
      })();
    default: 
      return state;
  }
}