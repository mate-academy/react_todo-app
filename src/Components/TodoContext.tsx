import React, { createContext, useContext, useEffect, useReducer, useState} from 'react';
import { Todo } from '../Types/Todo';
import { FilterStatus } from '../Types/types';

const localStorageKey = 'todos';

type Action =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: { id: number; data: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'TOGGLE_ALL_TODOS'; payload: boolean }
  | { type: 'CLEAR_COMPLETED' };

  function todoReducer(state: Todo[], action: Action): Todo[] {
    switch (action.type) {
      case 'SET_TODOS':
        return action.payload;
      case 'ADD_TODO':
        return [...state, action.payload];
      case 'UPDATE_TODO':
        return state.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.data } : todo
        );
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      case 'TOGGLE_ALL_TODOS':
        return state.map(todo => ({ ...todo, completed: action.payload }));
      case 'CLEAR_COMPLETED':
        return state.filter(todo => !todo.completed);
      default:
        return state;
    }
  }

interface TodoContextType {
  todos: Todo[];
  filterStatus: FilterStatus;
  isProcessing: boolean;
  setFilterStatus: (status: FilterStatus) => void;
  addTodos: (title: string) => void;
  deleteTodo: (id: number) => void;
  handleUpdateTodo: (id: number, data: Partial<Todo>) => void;
  toggleAllTodos: () => void;
  clearCompleted: () => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.All);

  useEffect(() => {
    const storedTodos = localStorage.getItem(localStorageKey);
    if (storedTodos) {
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(storedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);

  function addTodos(title: string) {
    const trimmedTitle = title.trim();
    if (trimmedTitle === '') {
      return;
    }
    const newTodo: Todo = {
      id: new Date().getTime(),
      title: trimmedTitle,
      completed: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  }
  function deleteTodo(id: number) {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }

  function handleUpdateTodo(id: number, data: Partial<Todo>) {
    dispatch({ type: 'UPDATE_TODO', payload: { id: id, data } });
  };

  function toggleAllTodos() {
    const allCompleted = !(todos.length > 0 && todos.every(todo => todo.completed));
    dispatch({ type: 'TOGGLE_ALL_TODOS', payload: allCompleted });
  };

  function clearCompleted() {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const value: TodoContextType = {
    todos,
    filterStatus,
    isProcessing: false,
    setFilterStatus,
    addTodos,
    deleteTodo,
    handleUpdateTodo,
    toggleAllTodos,
    clearCompleted,
  };

  return (
    <TodoContext.Provider
      value={value}
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
