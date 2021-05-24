import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ id, title, completed }) => (
  <li key={id}>
    <div className="view">
      <input type="checkbox" className="toggle" />
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
};
