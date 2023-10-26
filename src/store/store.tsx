import React, { useReducer, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Dispatchers } from '../types/enums/Dispatchers';

type Actions = { type: Dispatchers.Add; payload: Todo }
| { type: Dispatchers.UpdateTitle; payload: Todo }
| { type: Dispatchers.ChangeStatus; payload: number }
| { type: Dispatchers.ChangeAllStatuses; payload: boolean }
| { type: Dispatchers.DeleteWithId; payload: number }
| { type: Dispatchers.DeleteComplited };

const reducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case Dispatchers.Add:
      return [
        ...state,
        action.payload,
      ];

    case Dispatchers.DeleteComplited:
      return [...state].filter(elem => !elem.completed);

    case Dispatchers.DeleteWithId:
      return [...state].filter(elem => elem.id !== action.payload);

    case Dispatchers.ChangeStatus: {
      return [...state].map(elem => {
        if (elem.id === action.payload) {
          return {
            ...elem,
            completed: !elem.completed,
          };
        }

        return elem;
      });
    }

    case Dispatchers.UpdateTitle: {
      const { title, id } = action.payload;

      return [...state].map(elem => {
        if (elem.id === id) {
          return {
            ...elem,
            title,
          };
        }

        return elem;
      });
    }

    case Dispatchers.ChangeAllStatuses: {
      return [...state].map(elem => {
        return {
          ...elem,
          completed: action.payload,
        };
      });
    }

    default:
      return state;
  }
};

interface State {
  state: Todo[];
  dispatch: (act: Actions) => void;
}

const initialState: State = {
  state: [],
  dispatch: () => [],
};

export const TodosContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode,
};

const localInitial: Todo[] = [];

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const { value, save } = useLocalStorage('todos', localInitial);
  const [state, dispatch] = useReducer(reducer, value);

  useEffect(() => {
    save(state);
  }, [state, save]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
