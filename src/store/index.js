import { createStore, combineReducers } from 'redux';
import { todosReducer } from './todos';
import * as selectorsTodos from './todos';

export const getTodos = state => selectorsTodos.getTodos(state.todos);
export const getActiveTodos = state => (
  selectorsTodos.getActiveTodos(state.todos)
);
export const getCompletedTodos = state => (
  selectorsTodos.getCompletedTodos(state.todos)
);
export const getActiveTodosLength = state => (
  selectorsTodos.getActiveTodosLength(state.todos)
);
export const isAllCompleted = state => (
  selectorsTodos.isAllCompleted(state.todos)
);

const rootReducer = combineReducers({
  todos: todosReducer,
});

const persistedState = localStorage
  .getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = createStore(
  rootReducer,
  persistedState,
);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
