import { FilterType, State, Todo } from '../types/Todo';

export type Action = { type: 'add', payload: string }
| { type: 'toggleAll', payload: boolean }
| { type: 'complete', payload: number }
| { type: 'delete', payload: number }
| { type: 'deleteCompleted' }
| { type: 'edit', payload: Todo }
| { type: 'filter', payload: FilterType };

export function reduser(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, {
          id: +new Date(),
          title: action.payload,
          completed: false,
        }],
      };

    case 'toggleAll':
      return {
        ...state,
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: action.payload,
          }
        )),
      };

    case 'complete':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'filter':
      return {
        ...state,
        filterBy: action.payload,
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'deleteCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'edit':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            };
          }

          return todo;
        }),
      };

    default:
      return state;
  }
}
