import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Todo } from './components/todo_items/todo';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from './components/locale_storage';

interface TodoContextType {
  todo: Todo[];
  setTodos: (todos: Todo[]) => void;
}

interface Methods {
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  renameTodo: (id: number, title: string) => void;
}

const defaultValue: TodoContextType = {
  todo: [],
  setTodos: () => {},
};

export const TodoContext = React.createContext<TodoContextType>(defaultValue);

export const MethodsContext = React.createContext<Methods>({
  handleDelete: () => {},
  handleComplete: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
  renameTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todo, setTodos] = useState<Todo[]>(() => getFromLocalStorage('todos'));

  useEffect(() => {
    saveToLocalStorage('todos', todo);
  }, [todo]);

  const todoItems = useMemo(
    () => ({
      todo,
      setTodos,
    }),
    [todo],
  );

  const handleDelete = useCallback(
    (id: number) => {
      const updatedTodo = todo.filter(todoItem => todoItem.id !== id);

      setTodos(updatedTodo);
      saveToLocalStorage('todos', updatedTodo);
    },
    [todo],
  );

  const handleComplete = useCallback(
    (id: number) => {
      const updatedTodos = todo.map(todoItem =>
        todoItem.id === id
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem,
      );

      setTodos(updatedTodos);
      saveToLocalStorage('todos', updatedTodos);
    },
    [todo],
  );

  const toggleAll = useCallback(() => {
    setTodos(allTodo => {
      const completed = allTodo.some(todoItem => !todoItem.completed);
      const updatedTodos = allTodo.map(item => ({ ...item, completed }));

      saveToLocalStorage('todos', updatedTodos);

      return updatedTodos;
    });
  }, []);

  const renameTodo = useCallback((id: number, title: string) => {
    setTodos(allTodo => {
      const updatedTodos = allTodo.map(todoItem =>
        todoItem.id === id ? { ...todoItem, title } : todoItem,
      );

      saveToLocalStorage('todos', updatedTodos);

      return updatedTodos;
    });
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(allTodo => {
      const activeTodos = allTodo.filter(todoItem => !todoItem.completed);

      saveToLocalStorage('todos', activeTodos);

      return activeTodos;
    });
  }, []);

  const methods = useMemo(
    () => ({
      handleDelete,
      handleComplete,
      toggleAll,
      renameTodo,
      clearCompleted,
    }),
    [handleDelete, handleComplete, toggleAll, renameTodo, clearCompleted],
  );

  return (
    <MethodsContext.Provider value={methods}>
      <TodoContext.Provider value={todoItems}>{children}</TodoContext.Provider>
    </MethodsContext.Provider>
  );
};
