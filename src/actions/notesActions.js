import { CREATE_NOTE, DELETE_NOTE, MODIFY_NOTE, ARCHIVE_NOTE, RESTORE_NOTE, DELETE_NOTE_PERMANENTLY, CLEAR_TRASH } from './types';

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

export const modifyNote = (id,noteContent) =>{
  return {
    type: MODIFY_NOTE,
    payload: {id,noteContent}
  }
}

export const archiveNote = (id) =>{
  return {
    type: ARCHIVE_NOTE,
    payload: id
  }
}

export const restoreNote = (id) =>{
  return {
    type: RESTORE_NOTE,
    payload: id
  }
}

export const deleteNotePermanently = (id) =>{
  return {
    type: DELETE_NOTE_PERMANENTLY,
    payload: id
  }
}

export const clearTrash = () =>{
  return{
    type: CLEAR_TRASH,
    payload: null
  }
}
