import { useReducer } from 'react';
import { Action } from '../types/Action';
import { State } from '../types/State';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

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
  startValue: Todo[],
): [State, (action: Action) => void] {
  const checkLocalStorage = (value: Todo[]): Todo[] => {
    const todos = localStorage.getItem('todos');

    if (todos === null) {
      return value;
    } else {
      try {
        return JSON.parse(todos);
      } catch (e) {
        return value;
      }
    }
  };

  const initialState: State = {
    todos: checkLocalStorage(startValue),
    filter: Status.all,
    selectedTodo: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const save = (action: Action): void => {
    localStorage.setItem(action.type, JSON.stringify(action.payload));
    if (action.type === 'todos' && action.payload.length === 0) {
      localStorage.removeItem(action.type);
    }

    dispatch(action);
  };

  return [state, save];
}
