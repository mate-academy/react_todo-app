import { State, Action, Todo } from '../types/types';

export const initialState: State = {
  todos: [],
  filter: 'all',
};

export const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return { ...state, todos: action.payload.todos };

    case 'ADD_TODO': {
      const title = action.payload.title.trim();

      if (!title) {
        return state;
      }

      const newTodo: Todo = {
        id: Date.now(),
        title,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'UPDATE_TODO_TITLE': {
      const { id, title } = action.payload;
      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== id),
        };
      }

      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, title: trimmedTitle } : todo,
        ),
      };
    }

    case 'TOGGLE_ALL_TODOS': {
      const { completed } = action.payload;

      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed })),
      };
    }

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter,
      };

    default:
      return state;
  }
};
