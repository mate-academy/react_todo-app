import React, { createContext, useEffect, useState } from 'react';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface TodoContextType {
  todos: Todo[];
  filter: Status;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, newTitle: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  setFilter: (value: Status) => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  filter: Status.All,
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  updateTodo: () => {},
  clearCompleted: () => {},
  toggleAll: () => {},
  setFilter: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos');

      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      localStorage.removeItem('todos');

      return [];
    }
  });
  const [filter, setFilter] = useState<Status>(Status.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: number, newTitle: string) => {
    const trimmedNewTitle = newTitle.trim();

    if (!trimmedNewTitle) {
      deleteTodo(id);

      return;
    }

    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, title: trimmedNewTitle } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(currentTodos =>
      currentTodos.filter(todo => todo.completed === false),
    );
  };

  const toggleAll = () => {
    setTodos(currentTodos => {
      const areAllCompleted = currentTodos.every(todo => todo.completed);
      const newStatus = !areAllCompleted;

      return currentTodos.map(todo => ({ ...todo, completed: newStatus }));
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        clearCompleted,
        toggleAll,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
