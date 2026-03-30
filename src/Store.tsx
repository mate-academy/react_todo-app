import React, { useEffect, useReducer } from 'react';
import { Todo } from './types/Todo';

const TODOS_KEY = 'todos';

interface State {
  todos: Todo[];
}

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'delete'; payload: number }
  | { type: 'clearCompleted' }
  | { type: 'toggle'; payload: number }
  | { type: 'toggleAll' }
  | { type: 'rename'; payload: { id: number; title: string } };

const loadTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem(TODOS_KEY);

  if (!storedTodos) {
    return [];
  }

  try {
    return JSON.parse(storedTodos) as Todo[];
  } catch {
    return [];
  }
};

const todosReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };
    case 'toggleAll':
      const completedAll = state.todos.some(todo => !todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: completedAll,
        })),
      };

    case 'rename':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    default:
      return state;
  }
};

const initialState: State = {
  todos: loadTodos(),
};

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
