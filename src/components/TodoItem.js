import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ id, title, completed, onComplete, onRemoveItem }) => (
  <li className={completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={id}
        onChange={onComplete}
      />
      <label htmlFor="todo-1">{title}</label>
      <button
        type="button"
        className="destroy"
        id={id}
        onClick={onRemoveItem}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default TodoItem;
