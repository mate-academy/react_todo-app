import { StatusFilter, Todos } from './Task';

export interface TodoContextType {
  todoTitle: string;
  setTodoTitle: (todo: string) => void;
  todos: Todos[];
  setTodos: (task: Todos[]) => void;
  statusFilter: string;
  setStatusFilter: (status: StatusFilter) => void;
  focusInput: React.MutableRefObject<(() => void) | undefined>;
  focusInputFn: (fn: () => void) => void;
}
