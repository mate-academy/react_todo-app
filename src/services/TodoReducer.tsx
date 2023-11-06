import { Action } from '../types/Action';
import { State } from '../types/State';
import { Todo } from '../types/Todo';

export function todoReducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case State.ADDED: {
      return [...todos, {
        id: action.id,
        title: action.title,
        completed: false,
      }];
    }

    case State.EDIT: {
      return todos.map(todo => {
        if (todo.id === action.task.id) {
          return action.task;
        }

        return todo;
      });
    }

    case State.DELETED: {
      return todos.filter(todo => todo.id !== action.id);
    }

    case State.TOGGLE_ALL: {
      return todos.map(todo => ({ ...todo, completed: action.completed }));
    }

    case State.CLEAR_COMPLETED: {
      return todos.filter(todo => !todo.completed);
    }

    default: {
      return todos;
    }
  }
}
