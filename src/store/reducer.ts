import { Filter } from '../enums/Filter';
import { Todo } from '../types/Todo';

export type RootState = {
  todos: Todo[];
  filter: Filter;
};

export type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleTodo'; payload: number }
  | { type: 'toggleAll' }
  | { type: 'clearCompleted' }
  | { type: 'updateTodo'; payload: { id: number; title: string } }
  | { type: 'setFilter'; payload: Filter };

export const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'toggleTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'toggleAll': {
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      };
    }

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'updateTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};
