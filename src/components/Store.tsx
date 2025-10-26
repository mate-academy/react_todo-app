import React, { useEffect, useReducer, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filters } from '../types/Filters';

type Action =
  | { type: 'add'; payload: Todo }
  | { type: 'delete'; payload: { id: number } }
  | { type: 'update_title'; payload: { id: number; title: string } }
  | { type: 'update_status'; payload: { id: number; completed: boolean } }
  | { type: 'set_filter'; payload: Filters }
  | { type: 'set_clear_completed' }
  | { type: 'set_all_toggle' };

interface State {
  todos: Todo[];
  filter: Filters;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      if (state.todos.some(todo => todo.id === action.payload.id)) {
        return state;
      }

      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'update_title':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    case 'update_status':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.completed }
            : todo,
        ),
      };

    case 'set_all_toggle':
      const allCompleted = state.todos.every(todo => todo.completed === true);
      const nextCompleted = !allCompleted;
      const nextTodos = state.todos.map(todo => ({
        ...todo,
        completed: nextCompleted,
      }));

      return {
        ...state,
        todos: nextTodos,
      };

    case 'set_filter':
      return { ...state, filter: action.payload };

    case 'set_clear_completed':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    default:
      return state;
  }
}

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data) {
      try {
        return JSON.parse(data) as T;
      } catch {
        /* ignore */
      }
    }

    localStorage.setItem(key, JSON.stringify(startValue));

    return startValue;
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const StateContext = React.createContext({
  todos: [] as Todo[],
  filter: Filters.All,
});

export const DisdatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>('todos', []);
  // ініціалізація редʼюсера з даними з localStorage
  const [state, dispatch] = useReducer(reducer, {
    todos: storedTodos,
    filter: Filters.All,
    // filter: storedFilter,
  });

  // кожного разу при зміні стану оновлюємо localStorage
  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  return (
    <DisdatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DisdatchContext.Provider>
  );
};
