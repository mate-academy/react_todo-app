import { Status } from '../enums/Status';
import { Todo } from '../types';

export const getFilteredTodos = (todos: Todo[], hash: Status): Todo[] => {
  switch (hash) {
    case Status.active:
      return todos.filter((({ completed }) => !completed));

    case Status.completed:
      return todos.filter((({ completed }) => completed));

    default:
      return [...todos];
  }
};
