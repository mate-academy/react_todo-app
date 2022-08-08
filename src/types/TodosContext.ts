import { CreateTodo, Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[],
  changeStatusTodo(todo: Todo): Promise<unknown>,
  deleteTodo(todo: Todo): Promise<unknown>,
  toogleALL(isAllCompleted: boolean): void,
  deleteAllCompleted(): void,
  editeTodoTitle(
    newTitle: string,
    todo: Todo
  ): Promise<void>,
  addTodo(
    newTodo: CreateTodo,
  ): Promise<void>,
};
