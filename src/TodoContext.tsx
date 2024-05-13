import React, { useEffect, useReducer } from 'react';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

type Action =
  | { type: 'addTodo'; title: string; id: number }
  | { type: 'removeTodo'; id: number }
  | { type: 'changeTodo'; id: number; title: string }
  | { type: 'markComplete'; id: number }
  | { type: 'toggleAllTodo' }
  | { type: 'removeCompletedTodo' }
  | { type: 'changeFilterStatus'; status: FilterStatus };

interface State {
  todos: Todo[];
  filterStatus: FilterStatus;
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

    case 'removeTodo':
      return {
        ...state,
        todos: todos.filter(t => t.id !== action.id),
      };

    case 'changeTodo':
      return {
        ...state,
        todos: todos.map(t =>
          t.id === action.id ? { ...t, title: action.title } : t,
        ),
      };

    case 'removeCompletedTodo':
      return {
        ...state,
        todos: todos.filter(t => !t.completed),
      };

    case 'markComplete':
      return {
        ...state,
        todos: todos.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t,
        ),
      };

    case 'toggleAllTodo':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !state.todos.every(t => t.completed),
        })),
      };

    case 'changeFilterStatus':
      return {
        ...state,
        filterStatus: action.status,
      };

    default:
      return state;
  }
}

const keyIsPresent = localStorage.getItem('todos');

const initialValue: State = {
  todos: keyIsPresent ? JSON.parse(keyIsPresent) : [],
  filterStatus: FilterStatus.All,
};

export const StateContext = React.createContext(initialValue);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, filterStatus }, dispatch] = useReducer(reducer, initialValue);

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
