import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ title, id, completed, toggleChecked, destroyItem }) => (
  <li
    className={
      completed
        ? 'completed'
        : 'view'
    }
  >
    <div>
      <input
        type="checkbox"
        className="toggle"
        id={id}
        checked={completed}
        onChange={() => toggleChecked(id)}
      />
      <label htmlFor={id}>{title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => destroyItem(id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

export default TodoItem;

TodoItem.propTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleChecked: PropTypes.func.isRequired,
  destroyItem: PropTypes.func.isRequired,
}).isRequired;
