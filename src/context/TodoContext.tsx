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
  | { type: 'addTodo'; payload: Todo }
  | { type: 'editTodo'; payload: Todo }
  | { type: 'toggleTodo'; payload: number }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'filterTodos'; payload: FilterType }
  | { type: 'deleteCompletedTodos'; payload: number[] }
  | { type: 'toggleAllTodos'; payload: number[] };

function reduceTodos(state: State, action: Action) {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'editTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
        ),
      };
    case 'toggleTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'filterTodos':
      return {
        ...state,
        filter: action.payload,
      };
    case 'deleteCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !action.payload.includes(todo.id)),
      };
    case 'toggleAllTodos':
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
