import type { FilterStatus, TodoState } from './TodoContext';

type UpdateTodoPayload = {
  id: number;
  title?: string;
  completed?: boolean;
};

export type Action =
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: number }
  | { type: 'update'; payload: UpdateTodoPayload }
  | { type: 'setFilter'; payload: FilterStatus }
  | { type: 'toggleAll' }
  | { type: 'clearCompleted' };

export const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.payload,
            completed: false,
          },
        ],
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'update':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
        ),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'toggleAll': {
      const shouldCompleteAll = state.todos.some(todo => !todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: shouldCompleteAll,
        })),
      };
    }

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    default:
      return state;
  }
};
