import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const TodoItem = (props) => {
  const {
    todo: {
      id,
      title,
      completed,
    },
    onCheckboxChecked,
    onTodoDelete,
  } = props;

  return (
    <li
      className={cx('', { completed })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onChange={event => onCheckboxChecked(event.target.checked)}
          checked={completed}
        />
        <label
          htmlFor={id}
          className={cx('', { completed })}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => onTodoDelete(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onCheckboxChecked: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};
