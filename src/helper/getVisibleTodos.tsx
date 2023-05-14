import { Todo } from '../types/Todo';

export const getVisibleTodos = (todos: Todo[], filter: string) => {
  switch (filter) {
    case '/active':
      return todos.filter(todo => !todo.completed);

    case '/completed':
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
