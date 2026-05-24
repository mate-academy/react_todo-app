import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { Todo } from '../../types/type';
import { Action, todoReducer } from './TodoReducer';

export type FilterStatus = 'all' | 'active' | 'completed';

export type TodoState = {
  todos: Todo[];
  filter: FilterStatus;
};

type TodoContextValue = {
  state: TodoState;
  dispatch: Dispatch<Action>;
};

const STORAGE_KEY = 'todos';

const getInitialState = (): TodoState => {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return {
      todos: [],
      filter: 'all',
    };
  }

  try {
    return {
      todos: JSON.parse(savedTodos) as Todo[],
      filter: 'all',
    };
  } catch {
    return {
      todos: [],
      filter: 'all',
    };
  }
};

export const TodoContext = createContext<TodoContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const TodoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(todoReducer, undefined, getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
