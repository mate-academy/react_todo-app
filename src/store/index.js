import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import filterReducer from './filter';
import todosReducer from './todos';

export const getFilterValue = state => state.filter;
export const getTodos = state => state.todos;

const reducer = combineReducers({
  filter: filterReducer,
  todos: todosReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
