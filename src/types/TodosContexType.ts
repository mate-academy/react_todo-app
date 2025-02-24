import { Todo } from './Todo';

export enum TodoFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type TodosContextType = {
  todos: Todo[];
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
  toggleAllTodos: () => void;
};
