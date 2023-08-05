import { Status, Todo } from '../types';

export const getFilteredTodos = (todos: Todo[], filterBy: Status) => {
  if (filterBy === Status.All) {
    return todos;
  }

  return todos.filter(todo => {
    switch (filterBy) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
};
