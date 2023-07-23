import { Todo } from "./Todo";
import { FILTERS } from "./filterEnum";

export type Context = {
  todos: Todo[];
  saveTodo: (todoTitle: string) => void;
  toggleStatus: (id: number) => void;
  toggleAll: () => void;
  filterField: FILTERS;
  onChangeFilter: (str: FILTERS) => void;
  onClearCompleted: () => void;
  onDeleteTodo: (id: number) => void;
};
