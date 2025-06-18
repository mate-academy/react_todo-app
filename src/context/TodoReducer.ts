import { Action, State } from './TodoContextTypes';

export const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return { ...state, todos: action.payload };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'TOGGLE_ALL': {
      const areAllCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !areAllCompleted,
        })),
      };
    }

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    default:
      return state;
  }
};
