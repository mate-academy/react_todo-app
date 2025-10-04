import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Filter, Todo } from '../../types/todo';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filteredTodos = getActivesTodos(activeFilter);
  const completedTodos = getActivesTodos('completed');

  function handleActiveFilter(filter: Filter) {
    setActiveFilter(filter);
  }

  function handleSetTodos(newTodos: Todo) {
    setTodos(todos => [...todos, newTodos]);
  }

  function handleUpdateTodo(updatedTodo: Todo) {
    if (updatedTodo.title.trim() === '') {
      handleDeleteTodo(updatedTodo.id);
      return;
    }

    setTodos(prevTodos => {
      return prevTodos.map(todo =>
        todo.id === updatedTodo.id
          ? { ...todo, title: updatedTodo.title }
          : todo,
      );
    });
  }

  function handleClearCompleted() {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }

  function handleDeleteTodo(id: number) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  function handleToggleCompleted(id: number) {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      });
    });
  }

  function handleToggleALL() {
    setTodos(prevTodos => {
      if (prevTodos.find(todo => !todo.completed)) {
        return prevTodos.map(todo => ({ ...todo, completed: true }));
      } else {
        return prevTodos.map(todo => ({ ...todo, completed: false }));
      }
    });
  }

  function getActivesTodos(filterType: Filter) {
    if (filterType === 'all') {
      return todos;
    } else if (filterType === 'active') {
      return todos.filter(todo => !todo.completed);
    } else if (filterType === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  }

  const mainRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="todoapp__content">
      <Header
        todos={todos}
        handleSetTodos={handleSetTodos}
        handleToggleALL={handleToggleALL}
        mainRef={mainRef}
      />
      <Main
        todos={filteredTodos}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleCompleted={handleToggleCompleted}
        handleUpdateTodo={handleUpdateTodo}
         mainRef={mainRef}
      />

      {/* Hide the footer if there are no todos */}
      {todos.length > 0 && (
        <Footer
          handleActiveFilter={handleActiveFilter}
          activeFilter={activeFilter}
          counter={todos.length}
          handleClearCompleted={handleClearCompleted}
          completedTodos={completedTodos}
        />
      )}
    </div>
  );
};
