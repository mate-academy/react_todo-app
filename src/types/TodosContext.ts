import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[],
  addTodo: (title: string) => void,
  toggleTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
  updateTodoTitle: (id: number, newTitle: string) => void,
  deleteCompletedTodos: () => void;
};
