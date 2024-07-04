import { Status } from './Status';
import { Todo } from './Todo';

export interface State {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  status: Status;
  setStatus: (status: Status) => void;
  title: string;
  setTitle: (s: string) => void;
  editingId: number | undefined;
  setEditingId: (n: number | undefined) => void;
}
