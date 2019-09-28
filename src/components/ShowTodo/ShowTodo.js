/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function ShowTodos(props) {
  const {
    markAll,
    sortedTodo,
    statusChange,
    removeTodo,
  } = props;

  return (
    <section className="main" style={{ display: 'block' }}>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={markAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {sortedTodo.map(item => (
          <li className={item.status ? 'completed' : ''}>
            <div className="view">
              <input
                type="checkbox"
                checked={item.status}
                className="toggle"
                id={item.id}
                onClick={() => statusChange(item.id)}
              />
              <label
                htmlFor={item.id}
                style={{ display: 'block' }}
              >
                {item.title}
              </label>
              <button
                type="button"
                className="destroy"
                id={item.id}
                onClick={() => removeTodo(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

ShowTodos.propTypes = {
  sortedTodo: PropTypes.arrayOf(),
  markAll: PropTypes.func,
  statusChange: PropTypes.func,
  removeTodo: PropTypes.func,
}.isRequired;

export default ShowTodos;
