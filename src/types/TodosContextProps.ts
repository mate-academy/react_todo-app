import { Filter } from "./Filter";
import { Todo } from "./Todo";

export type TodosContextProps = {
  todos: Todo[],
  setTodos: (newTodos: Todo[]) => void,
  filteredTodos: Todo[],
  filterType: Filter,
  setFilterType: (filter: Filter) => void,
};
