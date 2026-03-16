import { Todo } from '../types/todo';

const TODOS_KEY = 'todos';

export const todosService = {
  getTodos(): Todo[] {
    const data = localStorage.getItem(TODOS_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as Todo[];
    } catch {
      // log error
      return [];
    }
  },

  setTodos(todos: Todo[]) {
    try {
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch {
      // log error
    }
  },
};
