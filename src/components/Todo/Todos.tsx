import React, { useMemo, useState } from 'react';
import { Filter, Todo } from '../../types/todo';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { set } from 'cypress/types/lodash';

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  function handleSetTodos(newTodos: Todo) {
    setTodos(todos => [...todos, newTodos]);
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

  function handleActiveFilter(filterType: Filter) {
    switch (filterType) {
      case 'all':
        setFilteredTodos(todos);
        setActiveFilter('all');
        break;
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        setActiveFilter('active');
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        setActiveFilter('completed');
        break;
      default:
        setFilteredTodos(todos);
        setActiveFilter('all');
        break;
    }
  }

  return (
    <div className="todoapp__content">
      <Header todos={todos} handleSetTodos={handleSetTodos} />
      <Main
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleCompleted={handleToggleCompleted}
      />

      {/* Hide the footer if there are no todos */}
      {todos.length > 0 && (
        <Footer
          handleActiveFilter={handleActiveFilter}
          activeFilter={activeFilter}
          counter={todos.length}
          handleClearCompleted={handleClearCompleted}
        />
      )}
    </div>
  );
};
