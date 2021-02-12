// import { combineReducers } from 'redux';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD-TODO':
      return 1;
    case 'DELETE-TODO':
      return 2;
    case 'ALL-TODOS':
      return 3;
    case 'FILTER-BY-ACTIVE':
      return 4;
    case 'FILTER-BY-COMPLETED':
      return 5;
    default:
      return 6;
  }
};

export default todoReducer;
