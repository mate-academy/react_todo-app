import { Todo } from '../types/Todo';

export const KEY = 'todos';

export const getTodos = (): Todo[] => {
  return JSON.parse(localStorage[KEY]);
};

export const createTodo = (todo: Todo) => {
  let todos = getTodos();

  todos = [...todos, todo];
  localStorage.removeItem(KEY);
  localStorage.setItem(KEY, JSON.stringify(todos));
};

export const deleteTodo = (id: number) => {
  let todos = getTodos();

  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem(KEY, JSON.stringify(todos));
};

export const updateTodo = (updatedTodo: Todo) => {
  let todos = getTodos();

  todos = todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));
  localStorage.removeItem(KEY);
  localStorage.setItem(KEY, JSON.stringify(todos));
};
