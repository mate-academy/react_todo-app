import { useReducer, useEffect } from 'react';
import {
  State, Action, ActionTypeEnum,
} from './Types';

function reducer(
  state: State,
  { type, payload }: Action,
) {
  switch (type) {
    case ActionTypeEnum.Add:
      return {
        ...state,
        todos: [
          ...state.todos,
          payload.todo,
        ],
      };
    case ActionTypeEnum.Delete:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload.todoId),
      };
    case ActionTypeEnum.Edit:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === payload.todoId) {
            return {
              ...todo,
              title: payload.newTitle,
            };
          }

          return todo;
        }),
      };
    case ActionTypeEnum.Complete:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === payload.todoId) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };
    case ActionTypeEnum.CompleteAll:
      return {
        ...state,
        todos: state.todos
          .map(todo => ({ ...todo, completed: payload.completed })),
      };
    case ActionTypeEnum.Filter:
      return {
        ...state,
        filter: payload.filterType,
      };
    case ActionTypeEnum.ClearCompleted:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      throw new Error('Invalid action');
  }
}

export function useLocalStorage(
  key: string,
  startValue: State,
): [State, (v: Action) => void] {
  const [state, dispatch] = useReducer(reducer, null, () => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}
