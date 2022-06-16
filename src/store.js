import { configureStore } from '@reduxjs/toolkit';
import { loadTodos } from './api/localStorage';
import todosReducer from './features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: loadTodos(),
});
