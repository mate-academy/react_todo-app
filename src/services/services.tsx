import { Todo } from '../types/Todo';

export const getTodos = (): Todo[] => {
  const todos = localStorage.getItem('todos');

  return todos ? JSON.parse(todos) : [];
};

export const completedTodos = (todos: Todo[]) => {
  return todos.filter(todo => todo.completed);
};
