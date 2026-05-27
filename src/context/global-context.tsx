import React from 'react';
import { State } from '../types/state';
import { FilterType } from '../types/filters';
import { Action } from '../types/action';

const getInitialState = (): State => {
  const saved = localStorage.getItem('todos');

  try {
    return {
      todos: saved ? JSON.parse(saved) : [],
      filter: 'all',
    };
  } catch (e) {
    return { todos: [], filter: 'all' };
  }
};

export const FILTER_NAMES: FilterType[] = ['all', 'active', 'completed'];

const initialState = getInitialState();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'remove':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'edit':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };
    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'toggle_all':
      return {
        ...state,
        todos: state.todos.map(todo => {
          return {
            ...todo,
            completed: !state.todos.every(toDo => toDo.completed),
          };
        }),
      };
    default:
      return state;
  }
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
