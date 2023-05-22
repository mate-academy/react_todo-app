import { SelectOptions } from '../types/SelectOptions';
import { Todo } from '../types/Todo';

export const filterTodosBySelectOptions = (
  todos: Todo[], type: SelectOptions,
) => {
  const visibleTodos = [...todos];

  switch (type) {
    case SelectOptions.ACTIVE:
      return visibleTodos.filter((todo: Todo) => !todo.completed);
    case SelectOptions.COMPLETED:
      return visibleTodos.filter((todo: Todo) => todo.completed);
    case SelectOptions.ALL:
    default:
      return visibleTodos;
  }
};
