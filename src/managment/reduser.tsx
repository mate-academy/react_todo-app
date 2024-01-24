import { Filter } from '../types/Filter';
import { State } from '../types/State';

export type Action =
 { type: 'addTodo', title: string }
 | { type: 'filter', payload: Filter }
 | { type: 'editTitle', newTitle: string, id: number }
 | { type: 'marcToComplited', id: number }
 | { type: 'complited', payload: boolean }
 | { type: 'removeToComplited' }
 | { type: 'removeTodo', id: number
 };

export function reduser(action: Action, state: State) {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: {
          ...state,
          id: +new Date(),
          title: action.title,
          completed: false,
        },
      };
    case 'filter':
      return {
        ...state,
        filterTp: action.payload,
      };
    case 'editTitle':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id && todo.title !== action.newTitle) {
            return {
              ...todo,
              title: action.newTitle,
              completed: false,
            };
          }

          return todo;
        }),
      };
    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case 'marcToComplited':
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
    case 'removeToComplited':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'complited':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };
    default:
      return state;
  }
}
