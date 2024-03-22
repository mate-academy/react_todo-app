import { Todo } from '../../types';
import { Action } from './Action';
import { State } from './State';

export function todosReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'create': {
      const newTodo: Todo = {
        completed: false,
        id: Date.now(),
        title: action.payload.title,
      };

      return [...state, newTodo];
    }

    case 'remove': {
      return state.filter(currentTodo => currentTodo.id !== action.payload.id);
    }

    case 'toggleCompleted': {
      const foundTodo = state.find(
        currentTodo => currentTodo.id === action.payload.id,
      );

      if (foundTodo) {
        foundTodo.completed = !foundTodo.completed;
      }

      return [...state];
    }

    case 'edit': {
      const foundTodo = state.find(
        currentTodo => currentTodo.id === action.payload.id,
      );

      if (foundTodo) {
        const { completed, title } = action.payload;

        foundTodo.completed = completed ?? foundTodo.completed;
        foundTodo.title = title ?? foundTodo.title;
      }

      return [...state];
    }

    case 'removeAllCompleted': {
      return state.filter(currentTodo => currentTodo.completed === false);
    }

    case 'toggleAllCompleted': {
      const isEveryTodoCompleted = state.every(todo => todo.completed);

      return state.map(todo => ({
        ...todo,
        completed: !isEveryTodoCompleted,
      }));
    }

    default: {
      return state;
    }
  }
}
