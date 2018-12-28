import { CREATE_NOTE, DELETE_NOTE, MODIFY_NOTE, ARCHIVE_NOTE, RESTORE_NOTE, DELETE_NOTE_PERMANENTLY, CLEAR_TRASH } from '../actions/types';

import NoteData from '../entities/NoteData';


const initialState = [];
export default function(state = initialState, action){

  function getIndex(id){
    return state.findIndex(note => note.id === id);
  }

  switch(action.type){
    case CREATE_NOTE:
      state.push(action.payload);
      return state;
    
      case DELETE_NOTE_PERMANENTLY:
      return (()=>{
        const id = action.payload;
        const index = getIndex(id);
        if(index !== -1)
          state.splice(index,1); 
        return state;
      })();
   
    case CLEAR_TRASH:
      return state.filter(note => note.state !== NoteData.State().deleted)
    
    case MODIFY_NOTE:
      return (()=>{
        const {id, noteContent } = action.payload;
        const index = getIndex(id);
        if(index !== -1)
          for(const key in noteContent)
            state[index][key] = noteContent[key];
        state[index].mTime = new Date();
        return state;
      })();

      case ARCHIVE_NOTE:
      return (()=>{
        const id = action.payload;
        const index = getIndex(id);
        if(index !== -1)
          state[index].state = NoteData.State().archived;
        return state;
      })();

      case DELETE_NOTE:
      return (()=>{
        const id = action.payload;
        const index = getIndex(id);
        if(index !== -1)
          state[index].state = NoteData.State().deleted;
          state[index].dTime = new Date();
        return state;
      })();

      case RESTORE_NOTE:
      return (()=>{
        const id = action.payload;
        const index = getIndex(id);
        if(index !== -1)
          state[index].state = NoteData.State().normal;
        return state;
      })();
    default: 
      return state;
  }
}