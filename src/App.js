import React, { useState } from 'react';

import { TodoList } from './components/TodoList';
import { CreateTodo } from './components/CreateTodo';

function App() {
  const [todos, pushTodo] = useState([]);

  const setTodos = (title) => {
    pushTodo([
      ...todos,
      {
        id: todos.length + 1,
        title,
        completed: false,
      },
    ]);
  };

  return (
    <section className="todoapp">
      <CreateTodo
        todos={todos}
        pushTodo={setTodos}
      />

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {/* <ul className="todo-list">
          <li>
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>asdfghj</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

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

          <li>
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>1234567890</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>
        </ul> */}

        <TodoList todos={todos} />
      </section>

      <footer className="footer">
        <span className="todo-count">
          3 items left
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
