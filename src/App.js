import React, { useEffect, useState } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import { NewTodo } from './components/NewTodo';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

import { getTodos, getUser } from './api/api';
import { FILTERS } from './api/constant';

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

          <NewTodo
            onNewTodoAdd={setTodos}
            onErrorSet={setError}
          />
        </header>

        <section className="main">
          <TodoList
            todos={todos}
            typeFilteringTodos={filter}
            onTodosSet={setTodos}
          />
        </section>

        <footer
          className="footer"
          style={{ display: !todos.length ? 'none' : 'block' }}
        >
          <Footer
            todos={todos}
            onTodosSet={setTodos}
            onFilterSet={setFilter}
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
