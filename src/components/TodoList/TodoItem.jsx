import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

export const TodoItem = ({ todo, onToggleToDo }) => (
  <li
    className={classNames({ completed: todo.completed })}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        onChange={event => onToggleToDo(event, todo.id)}
      />
      <label>{todo.title}</label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onToggleToDo: PropTypes.func.isRequired,
};
