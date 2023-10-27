import { Todo } from './Todo';

export type Todos = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
};
