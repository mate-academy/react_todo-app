import { useReducer, useEffect } from 'react';
import { State, Action } from './Types';

function reducer(state: State, action:Action) {
  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        todos: [
          ...state.todos,
          action.todo,
        ],
      };
    case 'delete_todo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };
    case 'edit_todo':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.todoId) {
            return {
              ...todo,
              title: action.newTitle,
            };
          }

          return todo;
        }),
      };
    case 'complete_todo':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.todoId) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };
    case 'toggle_all':
      return {
        ...state,
        todos: state.todos
          .map(todo => ({ ...todo, completed: action.completed })),
      };
    case 'toggle_filter':
      return {
        ...state,
        filter: action.filterType,
      };
    case 'clear_completed':
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
