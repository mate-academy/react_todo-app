import { Todo } from '../types/Todo';

export const storeTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
