import { Todo } from './Todo';

export interface TodoContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}
