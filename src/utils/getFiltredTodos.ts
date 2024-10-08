import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export const getFiltredTodos = (todos: Todo[], filter: TodoStatus) => {
  switch (filter) {
    case TodoStatus.Completed:
      return todos.filter(todo => todo.completed);

    case TodoStatus.Active:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
};
