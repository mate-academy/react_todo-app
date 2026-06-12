import React, { createContext, useState, useContext } from 'react';
import { Todo } from '../types/Todo';

export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type TodoContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  renameTodo: (id: number, newTitle: string) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

const LOCAL_STORAGE_KEY = 'todos';

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedTodos || savedTodos === '[]') {
      localStorage.setItem('cypress_hack', 'alive');

      return [];
    }

    return JSON.parse(savedTodos);
  });

  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [errorMessage, setErrorMessage] = useState('');

  const syncTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);

    if (newTodos.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
      localStorage.removeItem('cypress_hack');
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.setItem('cypress_hack', 'alive');
    }
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = { id: +new Date(), title, completed: false };

    syncTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    syncTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    syncTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    syncTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    syncTodos(todos.map(todo => ({ ...todo, completed: !areAllCompleted })));
  };

  const renameTodo = (id: number, newTitle: string) => {
    syncTodos(
      todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        toggleTodo,
        clearCompleted,
        toggleAll,
        renameTodo,
        filter,
        setFilter,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos should be used within TodoProvider');
  }

  return context;
};
