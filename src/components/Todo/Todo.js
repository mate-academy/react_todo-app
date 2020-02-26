import React from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';

export const Todo = ({
  todo: { title, id, completed },
  toggleSetCompleted,
  removeTodo,
}) => (
  <li
    key={id}
    className={cx({ completed })}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={id}
        onChange={() => toggleSetCompleted(id)}
        checked={completed}
      />
      <label
        htmlFor={id}
      >
        {title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => removeTodo(id)}
      />
    </div>
    <input
      type="text"
      className="edit"
    />
  </li>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,

  toggleSetCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
