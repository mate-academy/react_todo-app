import { configureStore } from '@reduxjs/toolkit';

import todosReducer from '../features/TodoPage/todoPageSlice';
import toastReducer from '../features/Toast/toastSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    toast: toastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
