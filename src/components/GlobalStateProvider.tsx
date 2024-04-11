import React from 'react';
import { State } from '../types/State';
import { Action } from '../types/Action';

import { actions } from '../vars/ActionsTypes';

const initState: State = {
  todos: [],
  filter: 'all',
  editingTodo: null,
};

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case actions.INIT_TODOS:
      return {
        ...state,
        todos: payload,
      };

    case actions.SAVE_TODOS:
      localStorage.setItem('todos', JSON.stringify(state.todos));

      return state;

    case actions.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      };

    case actions.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload),
      };

    case actions.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo,
        ),
      };

    case actions.TOGGLE_ALL_TODOS:
      const areAllMarked = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: !areAllMarked })),
      };

    case actions.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case actions.SET_FILTER:
      return {
        ...state,
        filter: payload,
      };

    case actions.START_EDITING_TODO:
      return {
        ...state,
        editingTodo: payload,
      };

    case actions.STOP_EDITING_TODO:
      return {
        ...state,
        editingTodo: null,
      };

    case actions.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo === state.editingTodo ? { ...todo, title: payload } : todo,
        ),
        editingTodo: null,
      };

    default:
      return state;
  }
};

export const StateContext = React.createContext(initState);
// eslint-disable-next-line
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
