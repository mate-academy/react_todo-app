import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoListItem = ({
  task,
  status,
  id,
  deleteItem,
  switchTaskStatus,
  checked,
}) => (
  <li
    className={classNames(status)}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={`todo-${id}`}
        checked={checked}
        onChange={e => switchTaskStatus(id)}
      />
      <label
        htmlFor={`todo-${id}`}
      >
        {task}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteItem(id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoListItem.propTypes = {
  task: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  switchTaskStatus: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
