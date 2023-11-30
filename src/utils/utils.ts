import { getStoredTodos } from '../api/localStorageApi';
import { FilterType } from '../types/FilterType';
import { State } from '../types/State';

export const getFilterBy = () => {
  if (document.URL.endsWith('/#/completed')) {
    return FilterType.COMPLETED;
  }

  if (document.URL.endsWith('/#/active')) {
    return FilterType.ACTIVE;
  }

  return FilterType.ALL;
};

export const initialState: State = {
  todos: getStoredTodos(),
  filterBy: getFilterBy(),
};
