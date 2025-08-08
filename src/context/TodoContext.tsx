import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '../types/Todo';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../api/todos';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
  deleteTodoById: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  updateTodoTitle: (id: number, newTitle: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
  toggleAll: (completed: boolean) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: async () => {},
  deleteTodoById: async () => {},
  toggleTodo: async () => {},
  updateTodoTitle: async () => {},
  clearCompleted: async () => {},
  toggleAll: async () => {},
});

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {}
    })();
  }, []);

  const addTodo = async (title: string) => {
    try {
      if (!title.trim()) {
        return;
      }

      const newTodo = await createTodo(title);

      setTodos(prev => [...prev, newTodo]);
    } catch (error) {
      throw error;
    }
  };

  const deleteTodoById = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);

      if (!todoToUpdate) {
        return;
      }

      const updated = await updateTodo(id, {
        completed: !todoToUpdate.completed,
      });

      setTodos(prev => prev.map(todo => (todo.id === id ? updated : todo)));
    } catch (error) {
      throw error;
    }
  };

  const updateTodoTitle = async (id: number, newTitle: string) => {
    try {
      if (!newTitle.trim()) {
        await deleteTodoById(id);

        return;
      }

      const updated = await updateTodo(id, { title: newTitle.trim() });

      setTodos(prev => prev.map(todo => (todo.id === id ? updated : todo)));
    } catch (error) {
      throw error;
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);

      await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));
      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error) {
      throw error;
    }
  };

  const toggleAll = async (completed: boolean) => {
    try {
      await Promise.all(todos.map(todo => updateTodo(todo.id, { completed })));
      setTodos(prev => prev.map(todo => ({ ...todo, completed })));
    } catch (error) {
      throw error;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodoById,
        toggleTodo,
        updateTodoTitle,
        clearCompleted,
        toggleAll,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
