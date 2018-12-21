import { sortBy } from '../services/constants';
import { SET_SORT, SET_SORT_PAGE } from '../actions/types';
const sort = {
  currentPage: 'main',
  page: {
    main: sortBy.AZ,
    archive: sortBy.AZ,
    trash: sortBy.AZ
  }
};
export default function(state = sort,action){
  switch(action.type){
    case SET_SORT_PAGE:
     state = {
       ...state,
       currentPage: action.payload
     }
     return state;
    case SET_SORT:
      const {page,value} = action.payload;
      state = {...state};
      state.page[page] = value;
     return state;
     default:
     return state;
  }
}