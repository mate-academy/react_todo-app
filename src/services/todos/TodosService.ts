import { Todo } from '../../types';

const TODOS_KEY = 'todos';

export function getTodos(): Todo[] {
  return JSON.parse(localStorage.getItem(TODOS_KEY) as string);
}

export function setTodos(todos: Todo[]) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export function initStorage(): Todo[] {
  if (!localStorage.getItem(TODOS_KEY)) {
    setTodos([]);
  }

  return getTodos();
}
