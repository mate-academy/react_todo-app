import { FiltredBy } from './FiltredBy';
import { Todo } from './Todo';

export type Context = {
  todos: Todo[];
  leftTodo: number;
  filterParam: string;
  addNewTodo: (todoTitle: string) => void;
  deleteTodo: (id: number) => void;
  filtredTodos: () => Todo[];
  handleCompletedChange: (id: number) => void;
  setFilterParams: (value: FiltredBy) => void;
  clearCompleted: () => void;
  handleToggleAll: () => void;
  updateTodo: (id: number, title: string) => void;
};
