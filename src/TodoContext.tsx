import React, { useEffect, useMemo, useReducer, useRef } from 'react';
import { Todo } from './types/todo';

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  dispatch: (() => {}) as React.Dispatch<Action>,
  mainInputRef: { current: null } as React.RefObject<HTMLInputElement>,
});

type Action =
  | { type: 'addTodo'; payload: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleTodo'; payload: number }
  | { type: 'toggleAll' }
  | { type: 'clearCompleted' }
  | { type: 'updateTodo'; payload: { id: number; title: string } };

interface State {
  todos: Todo[];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            userId: 1,
            title: action.payload,
            completed: false,
          },
        ],
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'toggleTodo':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload) {
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };

    case 'toggleAll': {
      const allCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      };
    }

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'updateTodo':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload.id) {
            return todo;
          }

          return {
            ...todo,
            title: action.payload.title,
          };
        }),
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const mainInputRef = useRef<HTMLInputElement>(null);

  const value = useMemo(
    () => ({
      todos,
      dispatch,
      mainInputRef,
    }),
    [todos],
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
