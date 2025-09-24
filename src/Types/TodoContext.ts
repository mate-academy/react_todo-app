import { StatusFilter, Todos } from './Task';

export interface TodoContextType {
  todo: string;
  setTodo: (todo: string) => void;
  tasks: Todos[];
  setTask: (task: Todos[]) => void;
  statusFilter: string;
  setStatusFilter: (status: StatusFilter) => void;
  focusInput: React.MutableRefObject<(() => void) | undefined>;
  focusInputFn: (fn: () => void) => void;
}
