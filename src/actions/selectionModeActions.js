import { SET_SELECTION_MODE } from './types';


export const setSelectionMode = (value) =>{
  return{
    type: SET_SELECTION_MODE,
    payload: value
  }
}