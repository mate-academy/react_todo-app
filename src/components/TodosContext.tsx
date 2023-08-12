import React from "react";
import { Filter } from "../types/Filter";
import { TodosContextProps } from "../types/TodosContextProps";

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  setTodos: () => {},
  filteredTodos: [],
  filterType: Filter.ALL,
  setFilterType: () => {},
});
