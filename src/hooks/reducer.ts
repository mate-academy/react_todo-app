import { Action } from '../types/Action';
import { Todo } from '../types/Todo';

export function reducer(todos: Todo[], action: Action): Todo[] {
  let currentState: Todo[] = [];

  switch (action.type) {
    case 'add':
      currentState
        = [...todos, action.payload];
      break;

    case 'toggle':
      currentState
        = todos.map(todo => (todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo));
      break;

    case 'toggleAll':
      currentState
        = todos.map(todo => (todo.completed === action.payload
          ? { ...todo, completed: !action.payload }
          : todo));
      break;

    case 'edit':
      currentState
        = todos.map(todo => (todo.id === action.payload.id
          ? { ...todo, title: action.payload.newTitle }
          : todo));
      break;

    case 'delete':
      currentState
        = todos.filter(todo => todo.id !== action.payload);
      break;

    case 'clearCompleted':
      currentState
        = todos.filter(todo => !todo.completed);
      break;

    default:
      currentState = todos;
  }

  return currentState;
}
