import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export function TodoItem({ id, title, completed, handleDelete, handleToggle }) {
  return (
    <li
      className={cn({
        completed,
        editing: false,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => handleToggle(id)}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleDelete(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  completed: PropTypes.bool,
};

TodoItem.defaultProps = {
  title: '',
  completed: false,
};
