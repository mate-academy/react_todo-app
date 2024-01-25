import { Status } from './Status';
import { Todo } from './Todo';

export interface Context {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  filterTodos: Status,
  setFilterTodos: (filterField: Status) => void,
}

export interface ContextUpdate {
  deleteTodo: (todoId: number) => void,
}
