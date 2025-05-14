import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterOption } from '../types/FilterOption';

type FilterState = {
  status: FilterOption;
};

const initialState: FilterState = {
  status: FilterOption.ALL,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterOption>) => {
      return { ...state, status: action.payload };
    },
  },
});

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
