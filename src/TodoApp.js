import React, { useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { TodosContext } from './context/TodosContext';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { FILTERS } from './constants';

function TodoApp() {
  const todos = useContext(TodosContext);
  const { pathname } = useLocation();

  const filteredTodos = useMemo(
    () => (
      todos.filter(({ completed }) => {
        switch (pathname) {
          case FILTERS.active:
            return !completed;

          case FILTERS.completed:
            return completed;

          case FILTERS.all:
          default:
            return true;
        }
      })
    )
    , [todos, pathname],
  );

  const toggleAllChecked = useMemo(() => (
    todos.every(({ completed }) => completed)
  ), [todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo />
      </header>

      <TodoList
        todos={filteredTodos}
        toggleAllChecked={toggleAllChecked}
      />

      {todos.length > 0 && (
        <TodoFooter todos={filteredTodos} />
      )}
    </section>
  );
}

export default TodoApp;
