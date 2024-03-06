import { Action } from '../types/Action';
import { State } from '../types/State';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'edit':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.todoToChange.id) {
            return {
              ...todo,
              title: action.payload.newTitle,
            };
          }

          return todo;
        }),
      };

    case 'complete':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.todoComplete.id) {
            return {
              ...todo,
              completed: action.payload.newCompleted,
            };
          }

          return todo;
        }),
      };

    case 'toggleAll':
      return {
        ...state,
        todos: state.todos.map(todo => {
          return {
            ...todo,
            completed: action.payload,
          };
        }),
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'filter':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}
