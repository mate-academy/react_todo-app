import React, { useContext, useReducer } from 'react';
import {
  saveTodosToLocalStorage,
  loadTodosFromLocalStorage,
} from '../services/TodoService';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

interface State {
  todos: Todo[];
  inputValue: string;
  filterStatus: Filter;
}

export type Action =
  | { type: 'setTodo'; payload: Todo }
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setInputValue'; payload: string }
  | { type: 'setFilterStatus'; payload: Filter };

const initialState: State = {
  todos: [],
  inputValue: '',
  filterStatus: Filter.All,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setTodo': {
      const todos = [...state.todos, action.payload];

      saveTodosToLocalStorage(todos);

      return { ...state, todos };
    }

    case 'setTodos': {
      saveTodosToLocalStorage(action.payload);

      return { ...state, todos: action.payload };
    }

    case 'setInputValue':
      return { ...state, inputValue: action.payload };

    case 'setFilterStatus':
      return { ...state, filterStatus: action.payload };

    default:
      return state;
  }
}

export const StateContext = React.createContext(initialState);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {
    throw new Error('Dispatch function must be overriden!');
  },
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    todos: loadTodosFromLocalStorage(),
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }

  return context;
};

export const useGlobalDispatch = () => {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useDispatch must be used within a GlobalStateProvider');
  }

  return context;
};
