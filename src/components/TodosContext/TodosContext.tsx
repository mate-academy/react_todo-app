import React, { useReducer, useState } from 'react';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

const key = 'todos';

type Action = { type: 'add', payload: Todo }
| { type: 'remove', payload: number }
| { type: 'clearAllCompleted', payload: Todo[] }
| { type: 'toggle', payload: Todo }
| { type: 'toggleAll', payload: boolean }
| { type: 'edit', payload: Todo };

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

    case 'clearAllCompleted':
      currentState = [...action.payload];
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

    case 'toggleAll':
      currentState = [...state].map(todo => {
        return {
          ...todo,
          completed: action.payload,
        };
      });
      break;

    case 'edit':
      currentState = [...state].map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
          };
        }

        return { ...todo };
      });
      break;

    default:
      currentState = [...state];
      break;
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

export const FilterContext = React.createContext<Status>(Status.All);
export const SetFilterContext = (
  React.createContext<React.Dispatch<Status>>(() => {})
);

type Props = {
  children: React.ReactNode;
};

export const TodosContext: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, startingState);
  const [currentFilter, setCurrentFilter] = useState(Status.All);

  return (
    <SetFilterContext.Provider value={setCurrentFilter}>
      <FilterContext.Provider value={currentFilter}>
        <DispatchContext.Provider value={dispatch}>
          <StateContext.Provider value={todos}>
            {children}
          </StateContext.Provider>
        </DispatchContext.Provider>
      </FilterContext.Provider>
    </SetFilterContext.Provider>
  );
};
