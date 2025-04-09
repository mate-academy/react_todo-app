import { Filter } from './enum/Filter';
import { Todo } from './types/Todo';

export const filterTodo = (arrTodos: Todo[], myFilter: Filter): Todo[] => {
  if (myFilter === Filter.Active) {
    return arrTodos.filter((todo: Todo) => !todo.completed);
  }

  if (myFilter === Filter.Completed) {
    return arrTodos.filter((todo: Todo) => todo.completed);
  }

  return arrTodos;
};
