import { Todo } from '../types/Todo';
import { FILTERS } from '../types/filterEnum';

export const filterTodo = (todos: Todo[], filterField: FILTERS): Todo[] => {
  const copyTodo = [...todos];

  switch (filterField) {
    case FILTERS.ACTIVE:
      return copyTodo.filter((todo) => !todo.completed);
    case FILTERS.COMPLETED:
      return copyTodo.filter((todo) => todo.completed);
    default:
      return copyTodo;
  }
};
