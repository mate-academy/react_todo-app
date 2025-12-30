import { Todo, TodoId } from './ Todo';
import { Filter } from './Filter';

export interface TodosContextValue {
  todos: Todo[];

  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: TodoId) => Promise<void>;
  deleteTodo: (id: TodoId) => Promise<void>;
  updateTodo: (id: TodoId, title: string) => Promise<void>;
  toggleAll: () => Promise<void>;
  clearCompleted: () => Promise<void>;

  editingId: TodoId | null;
  setEditingId: (id: TodoId | null) => void;
  loadingIds: TodoId[];

  filter: Filter;
  setFilter: (filter: Filter) => void;
}
