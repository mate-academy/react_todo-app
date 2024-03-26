/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  addTodoAsync, deleteTodosAsync, initTodosAsync, updateTodosAsync,
} from './todos';

export type ErrorType =
  | 'Unable to load todos'
  | 'Unable to add a todo'
  | 'Title can\'t be empty'
  | 'Unable to delete a todo'
  | 'Unable to update a todo'
  | 'User was not found! Please register!'
  | 'Registration error';

type State = {
  errorMessage: ErrorType | null,
};

const initialState: State = {
  errorMessage: null,
};

const errorSlice = createSlice({
  name: 'errorMessage',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorType | null>) => {
      state.errorMessage = action.payload;
    },
    clearError: state => {
      state.errorMessage = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initTodosAsync.rejected, (state) => {
        state.errorMessage = 'Unable to load todos';
      })
      .addCase(addTodoAsync.rejected, (state) => {
        state.errorMessage = 'Unable to add a todo';
      })
      .addCase(deleteTodosAsync.rejected, (state) => {
        state.errorMessage = 'Unable to delete a todo';
      })
      .addCase(updateTodosAsync.rejected, (state) => {
        state.errorMessage = 'Unable to update a todo';
      });
  },
});

export default errorSlice.reducer;
export const { setError, clearError } = errorSlice.actions;
