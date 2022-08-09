import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ListTodos } from './components/ListTodos';
import { Todo } from './types/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosFromStor = localStorage.getItem('todos');

    try {
      return todosFromStor ? JSON.parse(todosFromStor) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const checketAll = (state: boolean) => {
    const checketTodos = todos.map(item => {
      return {
        ...item,
        completed: !state,
      };
    });

    setTodos(checketTodos);
  };

  return (
    <div className="todoapp">
      <Header
        setTodos={setTodos}
        todos={todos}
      />

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={(event) => checketAll(event.target.checked)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <Routes>
          <Route
            path="/"
            element={(
              <ListTodos
                todos={todos}
                setTodos={setTodos}
              />
            )}
          />
          <Route
            path="/active"
            element={(
              <ListTodos
                todos={todos.filter(todo => !todo.completed)}
                setTodos={setTodos}
              />
            )}
          />
          <Route
            path="/completed"
            element={(
              <ListTodos
                todos={todos.filter(todo => todo.completed)}
                setTodos={setTodos}
              />
            )}
          />
        </Routes>
      </section>

      <Footer
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
};
