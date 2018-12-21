import { CREATE_NOTE, DELETE_NOTE, DELETE_ALL_NOTES, UPDATE_NOTE } from './types';

export const createNote = (noteData) =>{
  return {
    type: CREATE_NOTE,
    payload: noteData
  }
}

export const deleteNote = (id) =>{
  return {
    type: DELETE_NOTE,
    payload: id
  }
}

export const updateNote = (noteData) => {
  return{
    type: UPDATE_NOTE,
    payload: noteData
  }
}

export const deleteAllNotes = () =>{
  return{
    type: DELETE_ALL_NOTES,
    payload: null
  }
}
