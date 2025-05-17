import { useTodoActions } from '../context/TodoContext';
import { Filter } from './Reducer';

export const useFooter = () => {
  const { setFilter, clear } = useTodoActions();

  const applyFilter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filterName: Filter,
  ) => {
    event.preventDefault();
    setFilter(filterName);
  };

  const clearAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    clear();
  };

  return { applyFilter, clearAll };
};
