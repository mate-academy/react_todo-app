import { Todo } from './Todo';

export type TypeTodosContext = {
  todos: Todo[],
  visibleTodos: Todo[],
  setTodos: (v: Todo[]) => void,
};
