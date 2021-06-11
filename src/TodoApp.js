import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';

import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { NewTodo } from './components/NewTodo';

const FILTERS = {
  all: '/',
  active: '/active',
  completed: '/completed',
};

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [allToggled, setAllToggled] = useState(false);
  const { pathname } = useLocation();

  const filteredTodos = useMemo(
    () => (
      todos.filter(({ completed }) => {
        switch (pathname) {
          case FILTERS.all:
            return true;

          case FILTERS.active:
            return !completed;

          case FILTERS.completed:
            return completed;

          default:
            return true;
        }
      })
    )
    , [todos],
  );

  useEffect(() => {
    setAllToggled(todos.every(({ completed }) => completed));
  }, [todos]);

  const handleToggle = (id) => {
    setAllToggled(false);

    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        id, title: todo.title, completed: !todo.completed,
      };
    }));
  };

  const handleToggleAll = () => {
    if (allToggled) {
      setTodos(todos.map(({ id, title, completed }) => ({
        id, title, completed: !completed,
      })));
    } else {
      setAllToggled(true);
      setTodos(todos.map(({ id, title }) => ({
        id, title, completed: true,
      })));
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => (
      todo.id !== id
    )));
  };

  const handleAddTodo = (title) => {
    setTodos(currentTodos => [
      ...currentTodos,
      { id: uuid(), title, completed: false },
    ]);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo handleSubmit={handleAddTodo} />
      </header>

      <TodoList
        todos={filteredTodos}
        allToggled={allToggled}
        handleToggle={handleToggle}
        handleToggleAll={handleToggleAll}
        handleDelete={handleDelete}
      />

      {todos.length > 0 && (
        <TodoFooter
          todos={filteredTodos}
          handleClearCompleted={handleClearCompleted}
        />
      )}
    </section>
  );
}

export default TodoApp;
