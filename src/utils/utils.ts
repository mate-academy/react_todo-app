import { Todo } from '../types/Todo';
import { ACTION_TYPES } from '../constants/index';
import { ReducerAction } from '../types/ReducerAction';

export const getLocalStorage = <T>(key: string, initialValue: T): T => {
  try {
    return JSON.parse(String(localStorage.getItem(key))) || [];
  } catch {
    return initialValue;
  }
};

export const getFilteredTodos = (
  initialTodos: Todo[],
  status: string,
): Todo[] => {
  switch (status) {
    case ACTION_TYPES.All: {
      return initialTodos;
    }

    case ACTION_TYPES.Active: {
      return initialTodos.filter((item: Todo) => !item.completed);
    }

    case ACTION_TYPES.Completed: {
      return initialTodos.filter((item: Todo) => item.completed);
    }
  }

  return initialTodos;
};

export const tasksReducer = (tasks: Todo[], action: ReducerAction): any => {
  switch (action.type) {
    case ACTION_TYPES.Add: {
      return [
        ...tasks,
        {
          id: action.id,
          title: action.newTodo,
          completed: false,
        },
      ];
    }

    case ACTION_TYPES.Delete: {
      return tasks.filter((todo: Todo) => todo.id !== action.id);
    }

    case ACTION_TYPES.CompleteTask: {
      return [
        ...tasks.map((item: Todo) => {
          if (item.id === action.id) {
            return { ...item, completed: !item.completed };
          }

          return item;
        }),
      ];
    }

    case ACTION_TYPES.ClearCompletedTasks: {
      return tasks.filter((item: Todo) => !item.completed);
    }

    case ACTION_TYPES.CompleteAllTasks: {
      const isAllCompleted = tasks.every((item: Todo) => item.completed);

      return [
        ...tasks.map(item => {
          if (!item.completed || isAllCompleted) {
            return { ...item, completed: !item.completed };
          }

          return item;
        }),
      ];
    }

    case ACTION_TYPES.Edit: {
      return [
        ...tasks.map((item: Todo) => {
          if (item.id === action.id) {
            return { ...item, title: action.newTodo };
          }

          return item;
        }),
      ];
    }

    default:
      return tasks;
  }
};
