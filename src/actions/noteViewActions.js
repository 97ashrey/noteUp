import { SET_VIEW } from './types';

export const setView = (view) =>{
  return {
    type: SET_VIEW,
    payload: view
  }
}