import { configureStore } from '@reduxjs/toolkit';

import todoPageReducer from '../features/TodoPage/todoPageSlice';
import toastReducer from '../features/Toast/toastSlice';

export const store = configureStore({
  reducer: {
    todos: todoPageReducer,
    toast: toastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
