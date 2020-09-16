import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Todo = ({
  title,
  id,
  onCompletedChange,
  completed,
}) => (
  <li className={classNames({
    completed,
  })}
  >
    <div className="view">
      <input
        checked={completed}
        type="checkbox"
        className="toggle"
        onChange={() => {
          onCompletedChange(id);
        }}
      />
      <label>{title}</label>
      <button type="button" className="destroy" />
    </div>

    <input type="text" className="edit" />
  </li>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onCompletedChange: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
};
