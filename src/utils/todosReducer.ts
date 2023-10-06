import { Action } from '../types/Action';
import { Todo } from '../types/Todo';
import { saveState } from './manageLocalState';

export function todosReducer(state: Todo[], action: Action): Todo[] {
  let currentState: Todo[] = [];

  switch (action.type) {
    case 'add':
      currentState = [
        ...state,
        action.payload,
      ];
      break;

    case 'remove':
      currentState = state.filter(todo => todo.id !== action.payload);
      break;

    case 'clearAllCompleted':
      currentState = [...action.payload];
      break;

    case 'toggle':
      currentState = state.map(todo => {
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
      currentState = state.map(todo => {
        return {
          ...todo,
          completed: action.payload,
        };
      });
      break;

    case 'edit':
      currentState = state.map(todo => {
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

  saveState(currentState);

  return currentState;
}
