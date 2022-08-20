import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface ToastState {
  shown: boolean;
}

const initialState: ToastState = {
  shown: false,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state) => {
      state.shown = true;
    },
    hideToast: (state) => {
      state.shown = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export const isToastShown = (state: RootState) => (
  state.toast.shown
);

export default toastSlice.reducer;
