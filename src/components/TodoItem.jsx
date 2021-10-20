import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({ todo }) => (

  <li className={classNames({
    completed: todo.completed,
  })}
  >
    <div className="view">
      <input type="checkbox" className="toggle" />
      <label>{todo.title}</label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
