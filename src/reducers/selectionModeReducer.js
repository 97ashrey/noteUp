import { SET_SELECTION_MODE } from '../actions/types';

const initialState = false;
export default function(state = initialState, action){
  switch(action.type){
    case SET_SELECTION_MODE:
      return action.payload;
    default:
      return state; 
  }
}