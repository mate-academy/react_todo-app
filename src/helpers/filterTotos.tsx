import { Todo } from '../types/Todo';

export const filterTotos = (todos: Todo[], typeFilter: string) => {
  if (typeFilter === '/active') {
    return [...todos].filter((todo: Todo) => !todo.completed);
  }

  if (typeFilter === '/completed') {
    return [...todos].filter((todo: Todo) => todo.completed);
  }

  return [...todos];
};
