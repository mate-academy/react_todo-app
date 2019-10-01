/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const ShowTodos = ({
  handleCheckedTodos,
  todosToShow,
  handleTodoStatus,
  removeTodo,
}) => (
  <section className="main" style={{ display: 'block' }}>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={handleCheckedTodos}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {todosToShow.map(item => (
        <li className={item.status ? 'completed' : ''}>
          <div className="view">
            <input
              type="checkbox"
              checked={item.status}
              className="toggle"
              id={item.id}
              onClick={() => handleTodoStatus(item.id)}
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

ShowTodos.propTypes = {
  todosToShow: PropTypes.shape({
    status: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  handleCheckedTodos: PropTypes.func,
  handleTodoStatus: PropTypes.func,
  removeTodo: PropTypes.func,
}.isRequired;

export default ShowTodos;
