import { Todo, TodoId } from '../types/ Todo';
import { Filter } from './Filter';

export interface TodosContextValue {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: TodoId) => void;
  deleteTodo: (id: TodoId) => void;
  updateTodo: (id: TodoId, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  editingId: TodoId | null;
  setEditingId: (id: TodoId | null) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  loadingIds: TodoId[];
  setLoadingIds: (ids: TodoId[] | ((prev: TodoId[]) => TodoId[])) => void;
}
