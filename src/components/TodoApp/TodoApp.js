import React, { Component } from 'react';

// import { PropTypes } from 'prop-types';
// import cn from 'classnames';

export class TodoApp extends Component {
  state = {
    // todos,
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <li>
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-1" />
                <label htmlFor="todo-1">todo item 1</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li className="completed">
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-2" />
                <label htmlFor="todo-2">todo item 2</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li className="editing">
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-3" />
                <label htmlFor="todo-3">todo item 3</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li>
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-4" />
                <label htmlFor="todo-4">1234567890</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>
          </ul>
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
}
