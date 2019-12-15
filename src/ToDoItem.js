import React from 'react';
import PropTypes from 'prop-types';

function ToDoItem({ title, completed, id, mark, deleteItem }) {
  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          onChange={() => mark(id)}
          className="toggle"
          id={id}
          checked={completed}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteItem(id)}
        />
      </div>
    </li>
  );
}

ToDoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  mark: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default ToDoItem;
