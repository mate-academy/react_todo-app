import React, { useEffect, useReducer } from 'react';
import { Filters, Todo } from './types/Todo';
import { filterTodos } from './utils/services';
import { useLocalStorage } from './hooks/useLocalStorage';

type Action =
  | { type: 'filter'; payload: Filters }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'toggleTodo'; payload: number }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleAllTodos' }
  | { type: 'clearCompleted' }
  | { type: 'renameTodo'; payload: number | null };

interface State {
  allTodos: Todo[];
  todos: Todo[];
  activeFilter: Filters;
  renamingTodo: number | null;
}

const reducer = (state: State, action: Action): State => {
  let updatedTodos = state.allTodos;

  switch (action.type) {
    case 'addTodo': {
      updatedTodos = [...state.allTodos, action.payload];
      break;
    }

    case 'updateTodo': {
      updatedTodos = state.allTodos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );
      break;
    }

    case 'deleteTodo': {
      updatedTodos = state.allTodos.filter(todo => todo.id !== action.payload);
      break;
    }

    case 'clearCompleted': {
      updatedTodos = state.allTodos.filter(todo => !todo.completed);
      break;
    }

    case 'toggleTodo': {
      updatedTodos = state.allTodos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
      break;
    }

    case 'toggleAllTodos': {
      const isAllCompleted = state.allTodos.every(todo => todo.completed);

      updatedTodos = state.allTodos.map(todo => ({
        ...todo,
        completed: !isAllCompleted,
      }));
      break;
    }

    case 'filter': {
      return {
        ...state,
        activeFilter: action.payload,
        todos: filterTodos(state.allTodos, action.payload),
      };
    }

    case 'renameTodo': {
      return {
        ...state,
        renamingTodo: action.payload,
      };
    }

    default:
      return state;
  }

  return {
    ...state,
    allTodos: updatedTodos,
    todos: filterTodos(updatedTodos, state.activeFilter),
  };
};

const initialState: State = {
  allTodos: [],
  todos: [],
  activeFilter: Filters.All,
  renamingTodo: null,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext =
  React.createContext<React.Dispatch<Action> | null>(null);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [local, setLocal] = useLocalStorage<Todo[]>('todos', []);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    allTodos: local,
    todos: local,
    renamingTodo: initialState.renamingTodo,
  });

  useEffect(() => {
    setLocal(state.allTodos);
  }, [state.allTodos, setLocal]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
