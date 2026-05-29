import { TodoState } from './TodoContext';
import { Todo } from '../types/Todo';
import { StatusType } from '../types/Status';

export type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'toggle'; payload: number }
  | { type: 'delete'; payload: number }
  | { type: 'setFilter'; payload: StatusType }
  | { type: 'clearCompleted' }
  | { type: 'update'; payload: { id: number; title: string } }
  | { type: 'toggleAll' };

export const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'update':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    case 'toggleAll':
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      };
    default:
      return state;
  }
};
