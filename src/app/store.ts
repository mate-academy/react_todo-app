import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todosSlice';
import { filterSlice } from '../features/filterSlice';

const rootReducer = combineSlices({
  todos: todosSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
