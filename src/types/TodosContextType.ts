import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[],
  setTodos: (v: Todo[]) => void,
};
