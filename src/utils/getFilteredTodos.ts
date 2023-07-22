import { Status, Todo } from '../types';

export const getFilteredTodos = (todos: Todo[], filterBy: Status) => {
  return todos.filter(todo => {
    switch (filterBy) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      case Status.All:
      default:
        return todo;
    }
  });
};
