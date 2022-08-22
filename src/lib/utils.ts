import { Todo } from "../types/types";

export const getLocalTodos = (setTodos: (arg0: Todo[]) => void) => {
  if (localStorage.getItem('todos') === null) {
    localStorage.setItem('todos', JSON.stringify([]));
  } else {
    setTodos(JSON.parse(localStorage.getItem('todos') || ''));
  }
};
