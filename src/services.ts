import { Todo } from './types/Todo';

export const activeTodos = (todos: Todo[]) => {
  return todos.filter((todo: Todo) => !todo.completed);
};

export const completedTodos = (todos: Todo[]) => {
  return todos.filter((todo: Todo) => todo.completed);
};
