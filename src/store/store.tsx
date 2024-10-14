import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';

import { Filter } from '../types/Filter';
import { Action } from '../types/Action';
import { State } from '../types/State';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'changeTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };

    case 'changeTodos':
      return { ...state, todos: action.payload };

    case 'setFilter':
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  filter: Filter.ALL,
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});

interface Props {
  children: ReactNode;
}

export const GlobalStateProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
