import { useReducer } from 'react';
import { Action } from '../types/Action';
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

    case 'selectedTodo':
      return {
        ...state,
        selectedTodo: action.payload,
      };

    default:
      return state;
  }
}

export function useLocalStorage(
  startValue: State,
): [State, (action: Action) => void] {
  function checkLocalStorage<T>(key: string, defaultValue: T): T {
    const value = localStorage.getItem(key);

    if (value === null) {
      localStorage.setItem('todos', JSON.stringify(defaultValue));

      return defaultValue;
    } else {
      try {
        return JSON.parse(value);
      } catch (e) {
        return defaultValue;
      }
    }
  }

  const initialState: State = {
    todos: checkLocalStorage('todos', startValue.todos),
    filter: startValue.filter,
    selectedTodo: startValue.selectedTodo,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const save = (action: Action): void => {
    if (action.type === 'todos') {
      localStorage.setItem(action.type, JSON.stringify(action.payload));
    }

    dispatch(action);
  };

  return [state, save];
}
