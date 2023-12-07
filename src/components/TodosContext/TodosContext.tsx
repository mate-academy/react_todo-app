import React, { useReducer } from 'react';
import { TodosFilter } from '../../types/Todo';
import { State } from '../../types/State';

type Action = { type: 'addTodo', title: string }
| { type: 'removeTodo', id: number }
| { type: 'toggleCompleted', payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, {
          id: +new Date(),
          title: action.title,
          completed: false,
        }],
      };

    default:
      return state;
  }
}

const initialState = {
  todos: [],
  filterBy: TodosFilter.ALL,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((action: Action) => {});

type Props = {
  children: React.ReactNode
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
