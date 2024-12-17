import { Action } from '../types/Action';
import { RootState } from '../types/RootState';

export const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'setTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'updateTodo': {
      const todoToRefresh = action.payload;
      const updatedTodos = state.todos.map(todo =>
        todo.id === todoToRefresh.id ? todoToRefresh : todo,
      );

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'deleteTodo': {
      const updatedTodos = state.todos.filter(
        todo => todo.id !== action.payload,
      );

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    default:
      return state;
  }
};
