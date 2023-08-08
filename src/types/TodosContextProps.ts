import { Filter } from './Filter';
import { Todo } from './Todo';

export type TodosContextProps = {
  todos: Todo[],
  filteredTodos: Todo[],
  filterType: Filter,
  setTodos: (newTodos: Todo[]) => void,
  setFilterType: (filter: Filter) => void,
};
