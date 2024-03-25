import React, { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../type/Status';
import { Todo } from '../type/Todo';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setQuery':
      return {
        ...state,
        query: action.payload,
      };

    case 'setTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'ADD_TODO':
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    default:
      return state;
  }
}

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setQuery'; payload: Status };

interface State {
  todos: Todo[];
  query: Status;
}

const initialState: State = {
  todos: [],
  query: Status.All,
};

export const StateContext = React.createContext(initialState);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, saveTodos] = useLocalStorage<Todo[]>('todos', []);
  const [state, dispatch] = React.useReducer(reducer, {
    todos,
    query: Status.All,
  });

  useEffect(() => {
    saveTodos(state.todos);
  }, [saveTodos, state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
