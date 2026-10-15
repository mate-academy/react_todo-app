import { useEffect, useRef, useState } from 'react';
import { Todo, TodoChanges } from '../types/Todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const todosFromLocalStorage = localStorage.getItem('todos');

      if (!todosFromLocalStorage) {
        return [];
      }

      const parsedTodos = JSON.parse(todosFromLocalStorage);

      return Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch {
      return [];
    }
  });

  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  const activeTodos = todos.filter(todo => !todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const hasAllTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const addTodo = (rawTitle: string) => {
    const title = rawTitle.trim();

    if (!title) {
      return false;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    return true;
  };

  const focusNewTodoField = () => {
    newTodoFieldRef.current?.focus();
  };

  const handleDelete = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    focusNewTodoField();
  };

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
    focusNewTodoField();
  };

  const handleUpdate = (id: number, changes: TodoChanges) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, ...changes } : todo)),
    );
  };

  const handleToggleAll = () => {
    const completed = !hasAllTodosCompleted;

    setTodos(prev => prev.map(todo => ({ ...todo, completed })));
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return {
    todos,
    newTodoFieldRef,
    activeCount: activeTodos.length,
    hasCompletedTodos,
    hasAllTodosCompleted,
    addTodo,
    handleDelete,
    handleClearCompleted,
    handleUpdate,
    handleToggleAll,
  };
};
