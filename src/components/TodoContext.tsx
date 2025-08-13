import { createContext, useContext } from 'react';

export const classNames = (
  ...args: (string | { [key: string]: boolean } | undefined | null | false)[]
): string => {
  return args
    .filter(Boolean)
    .map(arg => {
      if (typeof arg === 'string') {
        return arg;
}

      if (typeof arg === 'object' && arg !== null) {
        return Object.entries(arg)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }

      return '';
    })
    .join(' ')
    .trim();
};

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = 'All' | 'Active' | 'Completed';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
  filter: 'All',
  setFilter: () => {},
});

export const useTodos = () => {
  const context = useContext(TodoContext);

  return context;
};
