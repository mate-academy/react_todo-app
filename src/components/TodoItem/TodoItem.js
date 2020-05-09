import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ title, id, completed }) => (
  <li>
    <div className="view">
      <input type="checkbox" className="toggle" id={`todo-${id}`} />
      <label htmlFor={`todo-${id}`}>{title}</label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
