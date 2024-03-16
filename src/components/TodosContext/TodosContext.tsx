import React, { useReducer } from 'react';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type DoubleClick = {
  state: boolean;
  id?: number | null;
};

type DispatchState = {
  title: string;
  filter: Status | '';
  editedTitle: string;
  isSelectedAll: boolean;
  isDoubleClicked: DoubleClick;
  todos: Todo[];
};

type Props = {
  children: React.ReactNode;
};

const initialState: DispatchState = {
  title: '',
  filter: '',
  editedTitle: '',
  isSelectedAll: false,
  isDoubleClicked: {
    state: false,
  },
  todos: [],
};

type Action =
  | { type: 'setTitle'; payload: string }
  | { type: 'setEditedTitle'; payload: string }
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setFilter'; payload: Status }
  | { type: 'setIsSelectedAll' }
  | { type: 'setIsDoubleClicked'; payload: DoubleClick };

const reducer = (state: DispatchState, action: Action) => {
  switch (action.type) {
    case 'setTitle':
      return {
        ...state,
        title: action.payload,
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'setIsSelectedAll':
      return {
        ...state,
        isSelectedAll: !state.isSelectedAll,
      };

    case 'setTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'setEditedTitle':
      return {
        ...state,
        editedTitle: action.payload,
      };

    case 'setIsDoubleClicked':
      return {
        ...state,
        isDoubleClicked: {
          state: action.payload.state,
          id: action.payload.id,
        },
      };

    default:
      return state;
  }
};

export const StateContext = React.createContext(initialState);
/* eslint-disable-next-line */
export const DispatchContext = React.createContext((action: Action) => {});

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
