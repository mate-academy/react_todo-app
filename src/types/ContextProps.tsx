import { MouseEventHandler } from 'react';
import { Status } from './Status';
import { Todos } from './Todos';

export interface ContextProps {
  todos: Todos[];
  addTodo: (todo: Todos, event: React.FormEvent<Element>) => void;
  deleteTodo: (todoID: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
  filterTodoByStatus: (todoItems: Todos[], values: Status) => Todos[];
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  status: Status;
  clearTodo: MouseEventHandler<HTMLButtonElement>
  editTodo: (id: number, editTitle: string) => void,
  toggleAll: (completed: boolean) => void;
}
