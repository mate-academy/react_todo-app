import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  TodoContextType,
  TodoState,
  TodoAction,
} from '../../types/TodoContextType';
import { Filter } from '../../types/Filter';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/Todo';

const initialState: TodoState = {
  todos: [],
  filter: Filter.All,
  errorText: null,
  query: '',
  isLoading: false,
  tempTodo: null,
  deletingTodoIds: [],
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const todoReducer = (
  state: TodoState,
  action: TodoAction,
): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'TOGGLE_ALL':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };

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

    case 'SET_ERROR':
      return {
        ...state,
        errorText: action.payload,
      };

    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_TEMP_TODO':
      return {
        ...state,
        tempTodo: action.payload,
      };

    case 'SET_DELETING_IDS':
      return {
        ...state,
        deletingTodoIds: action.payload,
      };

    default:
      return state;
  }
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedTodos, setSavedTodos] = useLocalStorage<Todo[]>('todos', []);
  const [state, dispatch] = useReducer(todoReducer, {
    ...initialState,
    todos: savedTodos,
  });

  useEffect(() => {
    setSavedTodos(state.todos);
  }, [state.todos, setSavedTodos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
