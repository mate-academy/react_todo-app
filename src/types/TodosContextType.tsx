import { ToDo } from './ToDo';
import { Status } from './Status';

export interface TodosContextType {
  todos: ToDo[];
  addTodo: (title: string) => void;
  updateTodo: (id: number, title: string) => void;
  removeTodo: (id: number) => void;
  markOneComplete: (id: number) => void;
  markAllComplete: () => void;
  clearCompleted: () => void;
  filterTodos: (status: Status) => ToDo[];
}
