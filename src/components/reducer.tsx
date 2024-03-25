import { Filter } from '../types/Filter';
import { State } from '../types/State';

export type Action =
  | { type: 'filter'; payload: Filter }
  | { type: 'addTodo'; title: string }
  | { type: 'editTitle'; id: number; newTitle: string }
  | { type: 'removeTodo'; id: number }
  | { type: 'markCompleted'; id: number }
  | { type: 'removeCompletedTodos' }
  | { type: 'toggleCompleted'; payload: boolean };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [
          {
            id: +new Date(),
            title: action.title,
            completed: false,
          },
          ...state.todos,
        ],
      };

    case 'filter':
      return {
        ...state,
        filterBy: action.payload,
      };

    case 'markCompleted':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t,
        ),
      };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id),
      };

    case 'removeCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'toggleCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };

    case 'editTitle':
      return {
        ...state,
        todos: state.todos.map(t => {
          return t.id === action.id && t.title !== action.newTitle
            ? { ...t, title: action.newTitle }
            : t;
        }),
      };
    default:
      return state;
  }
}
