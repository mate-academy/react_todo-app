import { ActionTypes } from '../types/ActionTypes';
import { Actions } from '../types/Actions';
import { State } from '../types/State';

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return {
        todos: [...state.todos, {
          id: +new Date(),
          title: action.payload,
          completed: false,
        }],
      };

    case ActionTypes.DELETE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case ActionTypes.CHANGE_TODO_TITLE:
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payloadId) {
            return todo;
          }

          return {
            ...todo, title: action.payloadText,
          };
        }),
      };

    case ActionTypes.CHANGE_TODO_STATUS:
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payloadId) {
            return todo;
          }

          return { ...todo, completed: action.payloadCompleted };
        }),
      };

    case ActionTypes.CHANGE_ALL_TODO_STATUS:
      return {
        todos: state.todos.map((todo) => {
          if (todo.completed === action.payload) {
            return { ...todo, completed: !action.payload };
          }

          return { ...todo, completed: !action.payload };
        }),
      };

    case ActionTypes.DELETE_COMPLETED:
      return {
        todos: state.todos.filter(todo => !todo.completed),
      };

    default:
      return state;
  }
}
