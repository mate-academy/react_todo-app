import { Todo } from '../types/Todo';

type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'REMOVE'; payload: number }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'RENAME'; payload: { id: number; title: string } }
  | { type: 'TOGGLE_ALL' }
  | { type: 'CLEAR_COMPLETED' };

export const todosReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD': {
      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return [...state, newTodo];
    }

    case 'REMOVE': {
      return state.filter(todo => todo.id !== action.payload);
    }

    case 'TOGGLE': {
      return state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });
    }

    case 'RENAME': {
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        }

        return todo;
      });
    }

    case 'TOGGLE_ALL': {
      const allCompleted = state.every(todo => todo.completed);

      return state.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));
    }

    case 'CLEAR_COMPLETED': {
      return state.filter(todo => !todo.completed);
    }

    default:
      return state;
  }
};
