import React from 'react';
import PropTypes from 'prop-types';
import './TodoListItem.scss';

export const TodoListItem = ({
  task,
  status,
  id,
  deleteItem,
  switchTaskStatus,
  checked,
}) => (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
  <li
    className={status === 'completed' ? 'completed' : 'active'}
    onClick={e => switchTaskStatus(id)}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={`todo-${id}`}
        checked={checked}
        readOnly
      />
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <label
        htmlFor={`todo-${id}`}
        onClick={e => switchTaskStatus(id)}
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
