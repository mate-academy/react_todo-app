import React, { useEffect, useReducer } from 'react';
import { Todo } from './type';

type Action =
  | { type: 'addTodo'; id: number; title: string }
  | { type: 'markCompleted'; id: number }
  | { type: 'removeTodo'; id: number }
  | { type: 'filterStatus'; status: string }
  | { type: 'updateTodo'; id: number; title: string }
  | { type: 'toggleAll' }
  | { type: 'removeAll' };

interface State {
  todos: Todo[];
  filterStatus: string;
}

function reducer(state: State, action: Action) {
  const { todos } = state;

  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [
          ...todos,
          {
            id: action.id,
            title: action.title.trim(),
            completed: false,
          },
        ],
      };
    case 'markCompleted':
      return {
        ...state,
        todos: todos.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t,
        ),
      };
    case 'removeTodo':
      return {
        ...state,
        todos: todos.filter(todo => todo.id !== action.id),
      };
    case 'removeAll':
      return {
        ...state,
        todos: todos.filter(todo => !todo.completed),
      };
    case 'filterStatus':
      return {
        ...state,
        filterStatus: action.status,
      };
    case 'updateTodo':
      return {
        ...state,
        todos: todos.map(t =>
          t.id === action.id ? { ...t, title: action.title } : t,
        ),
      };
    case 'toggleAll':
      return {
        ...state,
        todos: todos.map(todo => ({
          ...todo,
          completed: !todos.every(t => t.completed),
        })),
      };
    default:
      return state;
  }
}

const keyIsPresent = localStorage.getItem('todos');

const initialState: State = {
  todos: keyIsPresent ? JSON.parse(keyIsPresent) : [],
  filterStatus: 'all',
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, filterStatus }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ todos, filterStatus }}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
