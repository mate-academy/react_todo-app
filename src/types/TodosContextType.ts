import { Status } from "./Status";
import { Todo } from "./Todo";

export interface TodosContextType {
  todos: Todo[],
  filteredTodos: Todo[],
  addTodo: (newTodo: Todo) => void,
  removeTodo: (id: string) => void,
  editTodo: (id: string, newText: string) => void,
  setTodos: (v: Todo[]) => void,
  status: Status,
  setStatus: (v: Status) => void,
}
