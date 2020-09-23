import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, key, handleStatus }) => (
  <li key={key} className={ClassNames({ completed: todo.completed })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        onChange={() => handleStatus(todo.id)}
      />
      <label>{todo.title}</label>
      <button type="button" className="destroy" />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.objectOf.isRequired,
  key: PropTypes.number.isRequired,
  handleStatus: PropTypes.func.isRequired,
};
