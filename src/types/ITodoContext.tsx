import { Todo } from './Todo';

export interface ITodoContext {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  removeTodo: (id: number) => void;
}
