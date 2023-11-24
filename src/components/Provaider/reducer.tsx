import { Filter } from '../../types/Filter';
import { State } from '../../types/State';

export type Action =
  { type: 'addTodo', title: string }
  | { type: 'removeTodo', iD: number }
  | { type: 'editTitle', iD: number, newTitle: string }
  | { type: 'markCompleted', iD: number }
  | { type: 'toggleCompleted', payload: boolean }
  | { type: 'removeCompletedTodos' }
  | { type: 'filter', payload: Filter };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, {
          id: +new Date(),
          title: action.title,
          completed: false,
        }],
      };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.iD),
      };

    case 'editTitle':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.iD) {
            return {
              ...todo,
              title: action.newTitle,
            };
          }

          return todo;
        }),
      };

    case 'markCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.iD) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'toggleCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: action.payload,
          }
        )),
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
