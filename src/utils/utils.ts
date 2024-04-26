import { Todo } from '../types/Todo';
import { ACTION_TYPES, KEY_LOCALSTORAGE } from '../constants/index';
import { ReducerAction } from '../types/ReducerAction';

export function getLocalStorage<T>(key: string, initialValue: T): T {
  try {
    return JSON.parse(String(localStorage.getItem(key))) || [];
  } catch {
    return initialValue;
  }
}

export function tasksReducer(tasks: Array<Todo>, action: ReducerAction) {
  switch (action.type) {
    case ACTION_TYPES.Add: {
      const newState = [
        ...tasks,
        {
          id: action.id,
          title: action.newTodo,
          completed: false,
        },
      ];

      localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(newState));

      return newState;
    }

    case ACTION_TYPES.Delete: {
      const newState = tasks.filter((todo: Todo) => todo.id !== action.id);

      localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(newState));

      return newState;
    }

    case ACTION_TYPES.CompleteTask: {
      const newState = [
        ...tasks.map((item: Todo) => {
          if (item.id === action.id) {
            return { ...item, completed: !item.completed };
          }

          return item;
        }),
      ];

      localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(newState));

      return newState;
    }

    case ACTION_TYPES.ClearCompletedTasks: {
      const newState = tasks.filter((item: Todo) => !item.completed);

      localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(newState));

      return newState;
    }

    case ACTION_TYPES.CompleteAllTasks: {
      const newState = [
        ...tasks.map((item: Todo) => {
          return { ...item, completed: !item.completed };
        }),
      ];

      localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(newState));

      return newState;
    }

    case ACTION_TYPES.Active: {
      const items = JSON.parse(String(localStorage.getItem(KEY_LOCALSTORAGE)));

      return items.filter((item: Todo) => !item.completed);
    }

    case ACTION_TYPES.Completed: {
      const items = JSON.parse(String(localStorage.getItem(KEY_LOCALSTORAGE)));

      return items.filter((item: Todo) => item.completed);
    }

    case ACTION_TYPES.All: {
      const items = JSON.parse(String(localStorage.getItem(KEY_LOCALSTORAGE)));

      return items;
    }

    case ACTION_TYPES.Edit: {
      const newState = [
        ...tasks.map((item: Todo) => {
          if (item.id === action.id) {
            return { ...item, title: action.newTodo };
          }

          return item;
        }),
      ];

      localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(newState));

      return newState;
    }

    default:
      break;
  }
}
