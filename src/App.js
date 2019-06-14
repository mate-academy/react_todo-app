import React from 'react';

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus=""
        />
      </header>

      <section className="main" style={{ display: 'block' }}>
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          <li className="">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>sdfsdfsdf</label>
              <button className="destroy"></button>
            </div>
          </li>
          <li className="">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>dsfgsdfgdsrg</label>
              <button className="destroy"></button></div>
          </li>
          <li className="">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>sddfgdfgdf</label>
              <button className="destroy"></button>
            </div>
          </li>
        </ul>
      </section>
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count"><strong>3</strong> items left</span>
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
        <button className="clear-completed" style={{ display: 'block' }}></button>
      </footer>
    </section>
  );
}

export default App;
