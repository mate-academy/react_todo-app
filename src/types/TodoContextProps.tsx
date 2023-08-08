import { Todo } from './Todo';
import { FilterBy } from './FilterBy';

export type TodoContextProps = {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodos: (id: number, args: Partial<Todo>) => void;
  filterValue: FilterBy;
  setFilterValue: (value: FilterBy) => void;
};
