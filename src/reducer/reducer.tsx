import { Action } from '../types/Action';
import { State } from '../types/State';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setTodos':
      return { ...state, todos: action.payload };
    case 'addTodo':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'setFilter':
      return { ...state, filter: action.payload };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        focusHeader: true,
      };
    case 'clearCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
        focusHeader: true,
      };

    case 'toggleCompletionStatus': {
      const updatedTodos = state.todos.map(todo => {
        if (action.payload.includes(todo.id)) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
        focusHeader: true,
      };
    }

    case 'stopHeaderFocus':
      return { ...state, focusHeader: false };

    case 'updateTodoTitle': {
      const updatedTodos = state.todos.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo;
        }

        return { ...todo, title: action.payload.title };
      });

      return {
        ...state,
        todos: updatedTodos,
        focusHeader: true,
      };
    }

    default:
      return state;
  }
}
