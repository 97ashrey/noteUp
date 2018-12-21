import { SET_SORT, SET_SORT_PAGE } from './types';
export const setSort = (page,value) =>{
  return{
    type: SET_SORT,
    payload: {
      page,
      value
    }
  }
}

export const setSortPage = (page) =>{
  return {
    type: SET_SORT_PAGE,
    payload: page
  }
}