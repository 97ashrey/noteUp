import { viewType } from '../services/constants';
import { SET_VIEW } from '../actions/types';

const view = viewType.list;
export default function(state = view,action){
  switch(action.type){
    case SET_VIEW:
      let newState = state;
      newState = action.payload;
    return newState;
    default:
    return state;
  }
}