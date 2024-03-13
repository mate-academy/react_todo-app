import { Todo } from './Todo';

export interface TodosContextValue {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  toggleAllTodos: () => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  updateTodo: (id: number, newTitle: string) => void;
}
