import { Todo } from './Todo';
import { Status } from './Status';

export interface Context {
  visibleTodos: Todo[],
  status: Status,
  setStatus: (filter: Status) => void,
  addTodo: (todo: Todo) => void,
  deleteTodo: (todoId: number) => void,
  toggleCompletedTodo: (todoId: number) => void,
  editTodo: (todoId: number, newTitle: string) => void,
  incompletedCount: number,
  areTodos: boolean,
  areAllCompleted: boolean,
  areSomeCompleted: boolean,
  toggleAllTodosStatus: () => void,
  removeCompleted: () => void,
  todoEditId: number | null,
  setTodoEditId: (id: number | null) => void,
}
