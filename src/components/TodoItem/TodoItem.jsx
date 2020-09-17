import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ id, title, completed, changeStatus }) => (
  <li
    className={classNames({
      view: !completed,
      completed,
    })}
  >
    <div className="view">
      <input
        type="checkbox"
        checked={completed}
        className="toggle"
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
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
