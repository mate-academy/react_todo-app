import React from 'react';
import propTypes from 'prop-types';

const TodoApp = ({ todos }) => (
  <section className="main" style={{ display: 'block' }}>
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label htmlFor="toggle-all">
      Mark all as complete
    </label>

    <ul className="todo-list">
      {
        todos.map(todo => (
          <li className="" key={todo.id}>
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={`todo-${todo.id}`}
              />
              <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
              <button type="button" className="destroy" />
            </div>
          </li>
        ))
      }
    </ul>
  </section>
);

TodoApp.propTypes = {
  todos: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
  }).isRequired,
};

export default TodoApp;
