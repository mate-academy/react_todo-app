// eslint-disable-line import/extensions
import { State, Filter } from '../types/Types';

export type Action =
  | { type: 'addTodo'; title: string }
  | { type: 'removeTodo'; id: number }
  | { type: 'editTitle'; payload: { id: number; newTitle: string } }
  | { type: 'markDone'; id: number }
  | { type: 'toggleDone'; payload: boolean }
  | { type: 'removeCompletedTodos' }
  | { type: 'filter'; payload: Filter };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.title,
            completed: false,
          },
        ],
      };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    case 'editTitle':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (
            todo.id === action.payload.id &&
            todo.title !== action.payload.newTitle
          ) {
            return {
              ...todo,
              title: action.payload.newTitle,
              completed: false,
            };
          }

          return todo;
        }),
      };

    case 'markDone':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'toggleDone':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };

    case 'removeCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'filter':
      return {
        ...state,
        filterBy: action.payload,
      };

    default:
      return state;
  }
}
