import { Todo } from '../../types/Todo';

export const getInCompletedTodos = (todos: Todo[]) =>
  todos.filter(({ completed }) => !completed);

export const getCompletedTodos = (todos: Todo[]) =>
  todos.filter(({ completed }) => completed);

export const isAllTodosCompleted = (todos: Todo[]) =>
  todos.every(({ completed }) => completed);

export const hasCompletedTodos = (todos: Todo[]) =>
  todos.some(({ completed }) => completed);

export const hasInCompletedTodos = (todos: Todo[]) =>
  todos.some(({ completed }) => completed === false);
