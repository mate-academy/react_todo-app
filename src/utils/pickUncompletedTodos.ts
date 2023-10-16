import { Todo } from '../types';

export const pickCompletedTodos = (
  todos: Todo[],
) => todos.filter(({ completed }) => completed);
