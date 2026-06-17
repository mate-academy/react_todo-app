import React, { createContext, useState, useEffect } from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (updatedTodo: Todo) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
};

export const TodoContext = createContext<TodoContextType>(
  {} as TodoContextType,
);

export const TodoProvider = ({ children }: { children?: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      userId: 1,
      title,
      completed: false,
    };

    setTodos((prev: Todo[]) => [...prev, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );
  };

  const toggleAll = () => {
    const isAllCompleted =
      todos.length > 0 && todos.every((todo: Todo) => todo.completed);

    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) => ({ ...todo, completed: !isAllCompleted })),
    );
  };

  const clearCompleted = () => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleAll,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
