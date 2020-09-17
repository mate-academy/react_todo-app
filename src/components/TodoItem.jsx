import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ title, id, completed, changeStatus }) => (
  <li className={completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={completed}
        onChange={() => {
          changeStatus(id);
        }}
      />
      <label>{title}</label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
