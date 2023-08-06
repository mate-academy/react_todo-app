import { Todo } from './Todo';
import { Status } from './Status';

export interface Context {
  visibleTodos: Todo[],
  status: Status,
  setStatus: (filter: Status) => void,
  addTodo: (todo: Todo) => void,
  deleteTodo: (todoId: number) => void,
  toggleTodoStatus: (todoId: number) => void,
  editTodoTitle: (todoId: number, newTitle: string) => void,
  incompletedCount: number,
  hasTodos: boolean,
  isEveryCompleted: boolean,
  isAnyCompleted: boolean,
  toggleAllTodosStatus: () => void,
  removeCompleted: () => void,
  todoEditId: number | null,
  setTodoEditId: (id: number | null) => void,
}
