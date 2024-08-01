import React, { useReducer } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

interface State {
  todos: Todo[];
  inputValue: string;
  filterStatus: Filter;
}

type Action =
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
  const { type, payload } = action;

  switch (type) {
    case 'setTodo':
      const todos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos') as string)
        : [];

      todos.push(payload);

      localStorage.setItem('todos', JSON.stringify(todos));

      return {
        ...state,
        todos: todos,
      };

    case 'setTodos':
      localStorage.setItem('todos', JSON.stringify(payload));

      return {
        ...state,
        todos: payload,
      };

    case 'setInputValue':
      return {
        ...state,
        inputValue: payload,
      };

    case 'setFilterStatus':
      return {
        ...state,
        filterStatus: payload,
      };

    default:
      return state;
  }
}

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {
    throw new Error('Dispatch function must be overridden');
  },
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
