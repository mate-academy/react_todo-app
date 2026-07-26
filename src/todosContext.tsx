import React, { useEffect, useState } from 'react';

export interface Todo {
  id: number;
  completed: boolean;
  title: string;
}

export interface TodoContext {
  todos: Todo[];
  addTodo: (title: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  renameTodo: (id: number, newTitle: string) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  filter: 'All',
  addTodo: () => {},
  setFilter: () => {},
  deleteTodo: () => {},
  clearCompleted: () => {},
  toggleTodo: () => {},
  toggleAll: () => {},
  renameTodo: () => {},
});

export const TodosProvider = ({ children }: ProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      return JSON.parse(savedTodos);
    }

    return [];
  });

  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const deleteTodo = (targetId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== targetId));
  };

  const clearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const toggleTodo = (targetId: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo => {
        if (todo.id === targetId) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    );
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    const newStatus = !areAllCompleted;

    setTodos(currentTodos =>
      currentTodos.map(todo => {
        return {
          ...todo,
          completed: newStatus,
        };
      }),
    );
  };

  const renameTodo = (targetId: number, newTitle: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo => {
        if (todo.id === targetId) {
          return { ...todo, title: newTitle };
        }

        return todo;
      }),
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        filter,
        setFilter,
        deleteTodo,
        clearCompleted,
        toggleTodo,
        toggleAll,
        renameTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
