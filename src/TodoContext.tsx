import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { ActionType, Todo, TodoAction, TodoContextValue } from './types/todo';

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
    case ActionType.ADD: {
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

    case ActionType.TOGGLE:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case ActionType.UPDATE: {
      const trimmedTitle = action.title.trim();

      if (!trimmedTitle) {
        return state;
      }

      return state.map(todo =>
        todo.id === action.id ? { ...todo, title: trimmedTitle } : todo,
      );
    }

    case ActionType.REMOVE:
      return state.filter(todo => todo.id !== action.id);
    case ActionType.CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);
    case ActionType.TOGGLE_ALL:
      return state.map(todo => ({ ...todo, completed: action.completed }));
    default:
      return state;
  }
};

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, dispatch] = useReducer(todosReducer, undefined, loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      addTodo: (title: string) => dispatch({ type: ActionType.ADD, title }),
      toggleTodo: (id: number) => dispatch({ type: ActionType.TOGGLE, id }),
      updateTodo: (id: number, title: string) =>
        dispatch({ type: ActionType.UPDATE, id, title }),
      removeTodo: (id: number) => dispatch({ type: ActionType.REMOVE, id }),
      clearCompleted: () => dispatch({ type: ActionType.CLEAR_COMPLETED }),
      toggleAll: (completed: boolean) =>
        dispatch({ type: ActionType.TOGGLE_ALL, completed }),
    }),
    [todos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = (): TodoContextValue => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('Error!');
  }

  return context;
};
