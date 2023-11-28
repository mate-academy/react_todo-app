import { Action } from '../types/Action';
import { State } from '../types/State';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'createTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'toggleAll': {
      const { todos } = state;

      if (!todos.length) {
        return {
          ...state,
          toggleAll: action.payload,
        };
      }

      const toggledTodos = state.todos.map(todo => (
        {
          ...todo,
          completed: action.payload,
        }
      ));

      return {
        ...state,
        toggleAll: action.payload,
        todos: toggledTodos,
      };
    }

    case 'updateTodo': {
      const { completed, id, title } = action.payload;

      const updatedTodo = state.todos.find(
        todo => (todo.id === id),
      );

      if (updatedTodo) {
        updatedTodo.completed = completed;
        updatedTodo.title = title;
      }

      return {
        ...state,
        toggleAll: state.todos.every(t => t.completed),
      };
    }

    case 'filter': {
      return {
        ...state,
        filteredBy: action.payload,
      };
    }

    case 'destroy': {
      const filteredTodos = state.todos.filter(t => t.id !== action.payload);

      return {
        ...state,
        todos: filteredTodos,
      };
    }

    case 'clear': {
      const filteredTodos = state.todos.filter(t => !t.completed);

      return {
        ...state,
        todos: filteredTodos,
      };
    }

    case 'edit': {
      const { id, title } = action.payload;

      const updatedTodo = state.todos.find(
        todo => (todo.id === id),
      );

      if (updatedTodo) {
        updatedTodo.title = title;
      }

      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
