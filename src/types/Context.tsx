import { Todo } from './Todo';

export type Context = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  addTodoHandler: (newTodo: Todo) => void;
  updateTodoTitleHandler: (updatedTodo: Todo) => void;
  deleteTodoHandler: (todoId: number) => void;
};
