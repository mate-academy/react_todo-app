import React, { useEffect, useState } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import { AddTodo } from './components/AddTodo';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

import { getTodos, getUser } from './api/api';
import { FILTERS } from './api/constant';
import { getFilteringTodos } from './api/helper';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(FILTERS.all);

  const location = useLocation();

  useEffect(() => {
    // setTodos(JSON.parse(localStorage.getItem('todos')) || []);
    getTodos()
      .then(todosServer => setTodos(todosServer || []));
    getUser()
      .then(userServer => setUser(userServer));
  }, []);

  useEffect(() => {
    switch (location.hash) {
      case '#/':
        setFilter(FILTERS.all);
        break;
      case '#/active':
        setFilter(FILTERS.active);
        break;
      case '#/completed':
        setFilter(FILTERS.completed);
        break;
      default:
        break;
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <HashRouter>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <AddTodo
            onAddTodo={setTodos}
            setError={setError}
          />
        </header>

        <section className="main">
          <TodoList
            todos={getFilteringTodos(filter, todos)}
            onSetTodos={setTodos}
          />
        </section>

        <footer
          className="footer"
          style={{ display: !todos.length ? 'none' : 'block' }}
        >
          <Footer
            todos={todos}
            setTodos={setTodos}
            setFilter={setFilter}
          />
        </footer>
      </section>

      <section className="info">
        <section className="error">
          <p>{error}</p>
        </section>
        <p>{user.name}</p>
      </section>
    </HashRouter>
  );
};

export default App;
