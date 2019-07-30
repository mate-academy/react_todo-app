import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  todo, toggleChecked, deleteItem,
}) => (
  <li key={todo.id} className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.completed}
        onChange={() => toggleChecked(todo.id)}
      />
      {/* eslint-disable-next-line */}
      <label htmlFor={todo.id}>
        {todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteItem(todo.id)}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleChecked: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoItem;
