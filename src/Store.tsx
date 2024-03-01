import React, { useEffect, useReducer } from 'react';
import { State } from './types/State';
import { Status } from './types/Status';
import { Action } from './types/Action';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';

const initialState: State = {
  todos: [],
  filter: Status.All,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(el => el.id !== action.id),
      };

    case 'edit':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, title: action.value };
          }

          return todo;
        }),
      };

    case 'complete':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, completed: action.value };
          }

          return todo;
        }),
      };

    case 'toggleAll':
      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: action.value })),
      };

    case 'filter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    default:
      throw new Error('Incorrect action');
  }
}

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<(action: Action) => void>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [storageState, setStorageState] = useLocalStorage<Todo[]>(
    'todos',
    initialState.todos,
  );

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    todos: [...storageState],
  });

  useEffect(() => {
    setStorageState(state.todos);
  }, [state, setStorageState]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
