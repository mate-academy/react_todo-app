import { Todo } from '../types/Todo';
import { LinkTodo } from '../types/LinkTodo';

export const filterTotos = (todos: Todo[], typeFilter: string) => {
  switch (typeFilter) {
    case LinkTodo.Active:
      return [...todos].filter((todo: Todo) => !todo.completed);
    case LinkTodo.Completed:
      return [...todos].filter((todo: Todo) => todo.completed);

    default:
      return [...todos];
  }
};
