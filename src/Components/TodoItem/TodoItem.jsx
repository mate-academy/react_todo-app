import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ id, title, completed, changeChecked }) => (
  <li className={classNames({ completed })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        onChange={() => changeChecked(id)}
        checked={completed}
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
  changeChecked: PropTypes.func.isRequired,
};
