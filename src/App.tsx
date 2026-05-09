/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { TodosContext } from './contexts/TodosContext';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer/Footer';
import { FilterTodos } from './types/FilterTodosEnum';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos');

      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState<FilterTodos>(FilterTodos.All);
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focusRef.current?.focus();

    if (!localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }, []);

  const areAllTodosCompleted = () => {
    return todos.every(todo => todo.completed);
  };

  const saveTodo = (todoTitle: string) => {
    const todoId = Date.now();
    const newTodo = { id: todoId, title: todoTitle, completed: false };
    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const toggleTodo = (todoId: number) => {
    const toggledTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(toggledTodos);
    localStorage.setItem('todos', JSON.stringify(toggledTodos));
  };

  const deleteTodo = (todoId: number) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    focusRef.current?.focus();
  };

  const clearCompletedTodos = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
    localStorage.setItem('todos', JSON.stringify(activeTodos));
    focusRef.current?.focus();
  };

  const updateTodo = (todoId: number, newTitle: string) => {
    const trimmedNewTitle = newTitle.trim();

    if (trimmedNewTitle.length === 0) {
      deleteTodo(todoId);

      return;
    }

    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, title: trimmedNewTitle } : todo,
    );

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    focusRef.current?.focus();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterTodos.Active) {
      return !todo.completed;
    }

    if (filter === FilterTodos.Completed) {
      return todo.completed;
    }

    return true;
  });

  const toggleAll = () => {
    const isAllCompleted = areAllTodosCompleted();
    const updatedTodos = todos.map(todo => {
      return { ...todo, completed: !isAllCompleted };
    });

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodosContext.Provider
        value={{
          todos,
          filteredTodos,
          filter,
          areAllTodosCompleted,
          setFilter,
          clearCompletedTodos,
          toggleAll,
          toggleTodo,
          updateTodo,
          deleteTodo,
          saveTodo,
        }}
      >
        <div className="todoapp__content">
          <Header focusRef={focusRef} />

          {todos.length > 0 && <TodoList />}

          {todos.length > 0 && <Footer />}
        </div>
      </TodosContext.Provider>
    </div>
  );
};
