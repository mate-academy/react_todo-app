import { Todo } from '../types/Todo';
import { FilterTypes } from '../types/FilterTypes';
import React, { createContext, Dispatch, useEffect, useReducer } from 'react';

export interface TodoState {
  todos: Todo[];
  filter: FilterTypes;
}

export const initialTodoState: TodoState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  filter: 'all',
};

export type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'DELETE'; payload: number }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'TOGGLE_ALL' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: FilterTypes }
  | { type: 'UPDATE_TITLE'; payload: { id: number; title: string } };

//#region helper functions
const toggleAllTodos = (state: TodoState) => {
  const isAllCompleted = state.todos.every(todo => todo.completed);

  return {
    ...state,
    todos: state.todos.map(todo => {
      if (isAllCompleted) {
        return { ...todo, completed: false };
      }

      if (todo.completed) {
        return todo;
      }

      return { ...todo, completed: true };
    }),
  };
};
//#endregion helper functions

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD': {
      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    case 'TOGGLE_ALL':
      return toggleAllTodos(state);
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'UPDATE_TITLE':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, title: action.payload.title };
          }

          return todo;
        }),
      };
    default:
      return state;
  }
}

interface TodoContextType {
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const endHashStr = hash.replace('#/', '') as FilterTypes;

      if (endHashStr === 'active' || endHashStr === 'completed') {
        dispatch({ type: 'SET_FILTER', payload: endHashStr });
      } else {
        dispatch({ type: 'SET_FILTER', payload: 'all' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = React.useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
};
