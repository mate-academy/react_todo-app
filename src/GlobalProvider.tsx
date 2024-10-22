import React, { useEffect } from 'react';

import { Action } from './types/Action';
import { Filter } from './types/Filter';
import { State } from './types/State';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setFilter':
      return { ...state, filter: action.payload };

    case 'addTodo':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'updateTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };

    default:
      return state;
  }
};

const loadedTodos = localStorage.getItem('todos');
const initialState: State = {
  todos: loadedTodos ? JSON.parse(loadedTodos) : [],
  filter: Filter.All,
};

const StateContext = React.createContext<State>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => React.useContext(DispatchContext);
export const useGlobalState = () => React.useContext(StateContext);
