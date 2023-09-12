/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer, useState, useEffect } from 'react';
import { Filter, TodoType } from './types/types';

const ADD_TODO = 'add todo';
const REMOVE_TODO = 'remove todo';
const COMPLETE_TODO = 'complete todo';
const COMPLETE_ALL_TODO = 'complete all todo';
const UPDATE_TODO = 'update todo';

type Action = { type: typeof ADD_TODO, payLoad: TodoType }
| { type: typeof REMOVE_TODO, payLoad: number | 'All' }
| { type: typeof COMPLETE_TODO, payLoad: number }
| { type: typeof COMPLETE_ALL_TODO }
| { type: typeof UPDATE_TODO, payLoad: TodoType };

function reducer(state: TodoType[], action: Action): TodoType[] {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payLoad];

    case REMOVE_TODO: {
      if (action.payLoad === 'All') {
        const clearAllCompleted = state
          .filter((todo: TodoType) => todo.completed !== true);

        return clearAllCompleted;
      }

      const availableTodos = state
        .filter((todo: TodoType) => todo.id !== action.payLoad);

      return availableTodos;
    }

    case COMPLETE_TODO: {
      const toggleComplete = state
        .map((todo: TodoType) => {
          if (todo.id === action.payLoad) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        });

      return toggleComplete;
    }

    case UPDATE_TODO: {
      const updatedTodos = state.map(todo => {
        return { ...todo };
      });
      const index = updatedTodos
        .findIndex(todo => todo.id === action.payLoad.id);

      updatedTodos.splice(index, 1, action.payLoad);

      return updatedTodos;
    }

    case COMPLETE_ALL_TODO: {
      const isCompleted = state.some(todo => todo.completed === true);
      const allCompleted = state.every(todo => todo.completed === true);

      if (allCompleted) {
        const AllIncomplete = state.map(todo => {
          return { ...todo, completed: !todo.completed };
        });

        return AllIncomplete;
      }

      if (isCompleted) {
        const toggleAllComplete = state.map(todo => {
          if (todo.completed) {
            return todo;
          }

          return { ...todo, completed: !todo.completed };
        });

        return toggleAllComplete;
      }

      const ToggleAll = state.map(todo => {
        return { ...todo, completed: !todo.completed };
      });

      return ToggleAll;
    }

    default:
      return state;
  }
}

function getLocalStorage() {
  const data = localStorage.getItem('todo');

  if (data === null) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    localStorage.removeItem('todo');

    return [];
  }
}

const initialState: TodoType[] = getLocalStorage();

export const TodoContext = React.createContext({
  state: initialState,
  filterTodo: '',
  addTodo: (_payLoad: TodoType) => {},
  removeTodo: (_payLoad: number | 'All') => {},
  toggleComplete: (_payLoad: number) => {},
  toggleAllComplete: () => {},
  getFilteredTodo: (_payLoad: Filter) => {},
  updateTodo: (_payLoad: TodoType) => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);
  const [filterTodo, setFilterTodo] = useState(Filter.All);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(state));
  }, [state]);

  const value = {
    state,
    filterTodo,
    addTodo: (payLoad: TodoType) => {
      dispatcher({ type: 'add todo', payLoad });
    },
    removeTodo: (payLoad: number | 'All') => {
      dispatcher({ type: 'remove todo', payLoad });
    },
    toggleComplete: (payLoad: number) => {
      dispatcher({ type: 'complete todo', payLoad });
    },
    toggleAllComplete: () => {
      dispatcher({ type: 'complete all todo' });
    },
    getFilteredTodo: (filter: Filter) => {
      setFilterTodo(filter);
    },
    updateTodo: (payLoad: TodoType) => {
      dispatcher({ type: 'update todo', payLoad });
    },
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
