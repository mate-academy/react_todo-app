import { useReducer } from 'react';
import { Action } from '../store/Store';
import { State } from '../types/State';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'todos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'filter':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

export function useLocalStorage(
  startValue: State,
): [State, (action: Action) => void] {
  const checkLocalStorage = (value: State): State => {
    const todos = localStorage.getItem('todos');
    const filter = localStorage.getItem('filter');

    if (todos === null && filter === null) {
      return value;
    } else {
      try {
        return {
          todos: JSON.parse(todos || '[]'),
          filter: JSON.parse(filter || 'Status.all'),
        };
      } catch (e) {
        return value;
      }
    }
  };

  const initialState = checkLocalStorage(startValue);

  const [state, dispatch] = useReducer(reducer, initialState);

  const save = (action: Action): void => {
    localStorage.setItem(action.type, JSON.stringify(action.payload));
    dispatch(action);
  };

  return [state, save];
}
