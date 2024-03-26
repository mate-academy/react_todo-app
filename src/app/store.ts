import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos';
import errorReducer from './features/error';

const rootReducer = combineReducers({
  todos: todosReducer,
  error: errorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
