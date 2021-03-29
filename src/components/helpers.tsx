import React from 'react';
import { Todo } from './TodosContext';

export const filterCompleteTodo = (todos: Todo[]): Todo[] => {
  return todos.filter((todo: Todo) => todo.completed);
};

export const filterActiveTodo = (todos: Todo[]): Todo[] => {
  return todos.filter((todo: Todo) => !todo.completed);
};

export const showAllTodo = (todos: Todo[]): Todo[] => {
  return [...todos];
};
