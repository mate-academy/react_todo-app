import React, { Dispatch, useReducer } from 'react';
import { Filter } from '../../types/Todo';
import { State } from '../../types/State';

type Action = { type: 'addTodo', title: string }
| { type: 'removeTodo', id: number }
| { type: 'toggleCompleted', payload: boolean }
| { type: 'filter', payload: Filter }
| { type: 'removeCompletedTodods', };

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

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    case 'removeCompletedTodods':
      return {

      };

    case 'filter':
      return {
        ...state,
        filterBy: action.payload,
      };

    case 'toggleCompleted': {
      return {
        ...state,
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: action.payload,
          }
        )),
      };
    }

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filterBy: Filter.ALL,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<Dispatch<Action>>(() => {});

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
