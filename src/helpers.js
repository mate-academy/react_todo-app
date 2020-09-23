import { FILTERS } from './constants';

export const getfilteredTodos = (items, status) => {
  switch (status) {
    case FILTERS.all:
      return items;
    case FILTERS.active:
      return items.filter(item => !item.completed);
    case FILTERS.completed:
      return items.filter(item => item.completed);
    default:
      return 'Error!';
  }
};
