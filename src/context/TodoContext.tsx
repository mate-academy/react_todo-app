import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '../types/Todo';
import {
  USER_ID,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../api/todos';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
  deleteTodoById: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  updateTodoTitle: (id: number, newTitle: string) => Promise<boolean>;
  clearCompleted: () => Promise<void>;
  toggleAll: (completed: boolean) => Promise<void>;
}

const LOCAL_STORAGE_KEY = 'todos';

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: async () => {},
  deleteTodoById: async () => {},
  toggleTodo: async () => {},
  updateTodoTitle: async () => false,
  clearCompleted: async () => {},
  toggleAll: async () => {},
});

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (saved) {
      try {
        return JSON.parse(saved) as Todo[];
      } catch {
        return [];
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTodos(USER_ID);

        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setTodos([]);

        setTodos(data);
      } catch (error) {}
    })();
  }, []);

  const addTodo = async (title: string) => {
    if (!title.trim()) {
      return;
    }

    try {
      const newTodo = await createTodo(USER_ID, title);

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

  const updateTodoTitle = async (
    id: number,
    newTitle: string,
  ): Promise<boolean> => {
    try {
      if (!newTitle.trim()) {
        await deleteTodoById(id);

        return false;
      }

      const updated = await updateTodo(id, { title: newTitle.trim() });

      setTodos(prev => prev.map(todo => (todo.id === id ? updated : todo)));

      return true;
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
