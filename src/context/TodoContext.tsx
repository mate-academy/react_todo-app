/* eslint-disable no-console */
import React, {
  createContext,
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { State } from '../types/State';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

export const TodoContext = createContext<ContextProps>({
  state: { todos: [], filter: FilterType.All },
  dispatch: () => {},
  inputRef: { current: null },
});

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'EDIT_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'FILTER_TODOS'; payload: FilterType }
  | { type: 'DELETE_COMPLETED_TODOS'; payload: number[] }
  | { type: 'TOGGLE_ALL_TODOS'; payload: number[] };

function reduceTodos(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
        ),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'FILTER_TODOS':
      return {
        ...state,
        filter: action.payload,
      };

    case 'DELETE_COMPLETED_TODOS':
      return {
        ...state,
        todos: state.todos.filter(todo => !action.payload.includes(todo.id)),
      };

    case 'TOGGLE_ALL_TODOS':
      return {
        ...state,
        todos: state.todos.map(todo =>
          action.payload.includes(todo.id)
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    default:
      return state;
  }
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const getStoredTodos = () => {
    const stored = localStorage.getItem('todos');

    return stored ? JSON.parse(stored) : [];
  };

  const [state, dispatch] = useReducer(reduceTodos, {
    todos: getStoredTodos(),
    filter: FilterType.All,
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <TodoContext.Provider value={{ state, dispatch, inputRef }}>
      {children}
    </TodoContext.Provider>
  );
};
