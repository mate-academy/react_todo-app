/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NewTodoField from './components/NewTodoField';
import TodoList from './components/TodoList';
import ToggleAllButton from './components/ToggleAllButton';
import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const getInitialTodos = (): Todo[] => {
    const itemsString = localStorage.getItem('todos');

    return itemsString ? JSON.parse(itemsString) : [];
  };

  const [todos, setTodos] = useState<Todo[]>(getInitialTodos());
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodoField setItems={setTodos} />
      </header>

      <section className="main">
        {!!todos.length && (
          <ToggleAllButton
            items={todos}
            setItems={setTodos}
          />
        )}
        <Routes>
          <Route path="/">
            <Route
              index
              element={<TodoList items={todos} setItems={setTodos} />}
            />
            <Route
              path=":filter"
              element={<TodoList items={todos} setItems={setTodos} />}
            />
          </Route>
        </Routes>
      </section>

      <Footer
        items={todos}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setItems={setTodos}
      />
    </div>
  );
};
