import { Todo } from './Todo';

export type TypeTodosContext = {
  todos: Todo[],
  setTodos: (v: Todo[]) => void,
};
