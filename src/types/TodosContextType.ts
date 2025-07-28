import { FilterBy } from './FilterBy';
import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterBy: FilterBy;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>;
  activeTodosAmount: number;
};
