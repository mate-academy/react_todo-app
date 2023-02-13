import { Action } from '../enums/Action';
import { State } from '../types/State';

type ActionType = {
  type: Action,
  payload?: any,
}

export function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case Action.LOAD:
      return {
        ...state,
        todos: [...action.payload],
      };

    case Action.ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload,
        ],
      };

    case Action.DELETE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case Action.CLEAR:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case Action.TOGGLE_ALL: {
      const toggleValue = state.todos.every(todo => todo.completed);
      const toggledTodos = state.todos.map(todo => {
        return {
          ...todo,
          completed: !toggleValue,
        };
      });

      return {
        ...state,
        todos: toggledTodos,
      };
    }

    case Action.UPDATE: {
      const updatedTodos = state.todos.map(todo => {
        if (todo.id === action.payload[0]) {
          return {
            ...todo,
            ...action.payload[1],
          };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case Action.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
