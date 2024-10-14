import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], filter: Filter) => {
  const filterCallbacks = {
    [Filter.ALL]: () => true,
    [Filter.ACTIVE]: (todo: Todo) => !todo.completed,
    [Filter.COMPLETED]: (todo: Todo) => todo.completed,
  };

  return todos.filter(filterCallbacks[filter]);
};
