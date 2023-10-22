import { Todo } from "../types/Todo";
import { Status } from "./EnumStatusFilter";

export type Context = {
  todos: Todo[],
  setTodos: (todo: Todo[]) => void,
  addTodo: (todo: Todo) => void,
  count: number,
  title: string,
  setTitle: (titl: string) => void,
  updateTodo: (todo: Todo) => void,
  checkedAll: () => void,
  selectTodoFilteredList: Status,
  setSelectTodoFilteredList: (filter: Status) => void,
  deleteTodo: (tId: number) => void,
  filterTodos: Todo[],
  deleteAllCompleted: () => void,
};
