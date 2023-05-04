import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], pathname: string) => {
  switch (pathname) {
    case '/completed':
      return todos.filter(todo => todo.completed === true);
    case '/active':
      return todos.filter(todo => todo.completed === false);
    default:
      return todos;
  }
};
