import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ item, toggleOne, clearItem }) {
  return (
    <li className={item.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={item.id}
          onChange={toggleOne}
          checked={item.completed}
        />
        <label htmlFor="todo-1">{item.title}</label>
        <button
          type="button"
          id={item.id}
          onClick={clearItem}
          className="destroy"
        />
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  toggleOne: PropTypes.func.isRequired,
  clearItem: PropTypes.func.isRequired,
};

export default TodoItem;
