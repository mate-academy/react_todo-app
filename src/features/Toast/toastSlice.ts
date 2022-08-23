import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export interface ToastState {
  visible: boolean;
  message: string;
}

const initialState: ToastState = {
  visible: false,
  message: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.visible = true;
      state.message = action.payload;
    },
    hideToast: (state) => {
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export const toastSelector = (state: RootState) => (
  state.toast
);

export default toastSlice.reducer;
