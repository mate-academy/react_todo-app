import { type ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoFilter = 'all' | 'active' | 'completed';

export type TasksProviderProps = {
  children: ReactNode;
};

export type TodosContextValue = {
  todos: Todo[];
  filter: TodoFilter;
  setFilter: Dispatch<SetStateAction<TodoFilter>>;
  visibleTodos: Todo[];
  addTodo: (title: string) => void;
  toggleTodos: () => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  isEmpty: boolean;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};
