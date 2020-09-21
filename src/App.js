import React, { useState, useEffect } from 'react';
import { AddingForm } from './components/form';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (localStorage.todos) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const completedTodosCounter = x => (x
    .filter(elem => elem.completed).length);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddingForm setTodos={setTodos} />

        <h1>todos App</h1>

        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus=""
        />
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          <TodoList
            todos={todos}
            setTodos={setTodos}
          />

          <li className="completed">
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>qwertyuio</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="editing">
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>zxcvbnm</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          {`${completedTodosCounter(todos)} items left`}
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
