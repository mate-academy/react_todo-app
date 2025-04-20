import { FilterStatus } from './FilterStatus';
import { Todo } from './Todo';

export type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  counterTodos: number;
  setTodos: (v: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  toggleTodo: (todo: Todo) => void;
  status: FilterStatus;
  setStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
  counterCompletedTodos: number;
  toggleAllTodo: () => void;
  deleteTodo: (todoId: number) => void;
  clearCompleted: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
