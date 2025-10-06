import { Todo } from '../types/Todo';

export const getCompletedTodos = (todos: Todo[]) => {
  return todos.filter(todo => todo.completed);
};

export const getActiveTodos = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed);
};
