import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { Todo, TodoAction, TodoContextValue } from './types/todo';

const STORAGE_KEY = 'todos';

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

const loadTodos = (): Todo[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Todo[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const todosReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'add': {
      const trimmedTitle = action.title.trim();

      if (!trimmedTitle) {
        return state;
      }

      const newTodo: Todo = {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      };

      return [...state, newTodo];
    }

    case 'toggle':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case 'remove':
      return state.filter(todo => todo.id !== action.id);
    case 'clearCompleted':
      return state.filter(todo => !todo.completed);
    case 'toggleAll':
      return state.map(todo => ({ ...todo, completed: action.completed }));
    default:
      return state;
  }
};

export const TodoProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [todos, dispatch] = useReducer(todosReducer, undefined, loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      addTodo: (title: string) => dispatch({ type: 'add', title }),
      toggleTodo: (id: number) => dispatch({ type: 'toggle', id }),
      removeTodo: (id: number) => dispatch({ type: 'remove', id }),
      clearCompleted: () => dispatch({ type: 'clearCompleted' }),
      toggleAll: (completed: boolean) =>
        dispatch({ type: 'toggleAll', completed }),
    }),
    [todos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = (): TodoContextValue => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};
