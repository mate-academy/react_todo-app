import { createStore } from 'redux';
import { createSelector } from 'reselect';
import todosReducer, { countCompletedTodos, filterTodos } from './todos';
import { saveState, loadState } from '../localStorageHelper';

// Загрузка из LocaleStorage
const initState = loadState();

const reducer = (state = initState || {}, action) => ({
  todos: todosReducer(state.todos, action),
});

const store = createStore(reducer);

// Сохранение в LocaleStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;

// Селекторы
export const getTodos = state => state.todos;
export const getFilter = state => state.filter;

export const getFilteredTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => filterTodos(todos, filter)
);

export const getCompletedLength = createSelector(
  [getTodos],
  todos => countCompletedTodos(todos)
);
