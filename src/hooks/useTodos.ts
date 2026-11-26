import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todos';
import { FilterStatus } from '../types/FilterStatus';

function filteredTodos(todos: Todo[], filter: FilterStatus) {
  return todos.filter(todo => {
    switch (filter) {
      case FilterStatus.Active:
        return todo.completed === false;
      case FilterStatus.Completed:
        return todo.completed === true;
      default:
        return true;
    }
  });
}

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

  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => inputRef.current?.focus();

  useEffect(() => {
    focusInput();
  }, []);

  const addTodo = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const tempTodo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos(curTodos => [...curTodos, tempTodo]);
    setTitle('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    focusInput();
  };

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const visibleTodos = filteredTodos(todos, filter);
  const completedTodos = todos.length - activeTodos;

  const clearCompleted = () => {
    setTodos(curTodos => curTodos.filter(todo => !todo.completed));
    focusInput();
  };

  const editTodo = (todoId: number) => {
    const trimmedNewTitle = newTitle.trim();

    if (!trimmedNewTitle) {
      deleteTodo(todoId);

      return;
    }

    setTodos(curTodos =>
      curTodos.map(todo =>
        todo.id === todoId ? { ...todo, title: trimmedNewTitle } : todo,
      ),
    );
  };

  const allTodosCompleted = todos.length > 0 && todos.every(t => t.completed);

  const toggleTodo = (todoId: number) => {
    setTodos(curTodos =>
      curTodos.map(t =>
        t.id === todoId ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const toggleAll = () => {
    const nextCompleted = !allTodosCompleted;

    setTodos(curTodos =>
      curTodos.map(todo => ({
        ...todo,
        completed: nextCompleted,
      })),
    );
  };

  return {
    inputRef,
    todos,
    visibleTodos,
    setTodos,
    addTodo,
    title,
    setTitle,
    newTitle,
    setNewTitle,
    deleteTodo,
    activeTodos,
    completedTodos,
    setFilter,
    filter,
    clearCompleted,
    editTodo,
    allTodosCompleted,
    toggleTodo,
    toggleAll,
  };
};
