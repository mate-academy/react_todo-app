import { combineReducers } from 'redux';

import todos, * as fromTodos from './todo';
import filter from './filter';

const reducer = combineReducers({
  todos,
  filter,
});

// eslint-disable-next-line max-len
export const getFilteredTodos = state => fromTodos.getFilteredTodos(state.todos, state.filter);

export default reducer;
