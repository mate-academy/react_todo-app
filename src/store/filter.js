import { FILTERS } from '../constants';

const SET_VALUE = 'filter/SET_VALUE';

export const setFilterValue = newValue => ({
  type: SET_VALUE,
  payload: newValue,
});

export default (filterValue = FILTERS.all, action) => {
  switch (action.type) {
    case SET_VALUE:
      return action.payload;

    default:
      return filterValue;
  }
};
