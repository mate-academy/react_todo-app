import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export const TodoItem = ({
  title,
  id,
  completed,
  handleToggleStatus,
  removeTodoItem,
}) => (
  <li>
    <div className="view">
      <input
        type="checkbox"
        onChange={() => handleToggleStatus(id)}
        className="toggle"
        id={`todo-${id}`}
        checked={completed}
      />
      <label
        className={ClassNames({ completed })}
        htmlFor={`todo-${id}`}
      >
        {title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => removeTodoItem(id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleToggleStatus: PropTypes.func.isRequired,
  removeTodoItem: PropTypes.func.isRequired,
};
