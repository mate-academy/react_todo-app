import React, { useReducer } from 'react';

import { Todo } from '../../types/Todo';

const key = 'todos';

type Action = { type: 'add', payload: Todo }
| { type: 'remove', payload: number }
| { type: 'toggle', payload: Todo };

const save = (newState: Todo[]) => {
  localStorage.setItem(key, JSON.stringify(newState));
};

function reducer(state: Todo[], action: Action): Todo[] {
  let currentState: Todo[] = [];

  switch (action.type) {
    case 'add':
      currentState = [
        ...state,
        action.payload,
      ];
      break;

    case 'remove':
      currentState = [...state].filter(todo => todo.id !== action.payload);
      break;

    case 'toggle':
      currentState = [...state].map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !action.payload.completed,
          };
        }

        return { ...todo };
      });
      break;

    default:
      currentState = [...state];
  }

  save(currentState);

  return currentState;
}

const initialState: Todo[] = [];

const getStartingState = (): Todo[] => {
  const data = localStorage.getItem(key);

  if (data === null) {
    return initialState;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    localStorage.removeItem(key);

    return initialState;
  }
};

const startingState = getStartingState();

export const StateContext = React.createContext<Todo[]>(startingState);
export const DispatchContext = (
  React.createContext<React.Dispatch<Action>>(() => {})
);

type Props = {
  children: React.ReactNode;
};

export const TodosContext: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, startingState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={todos}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
