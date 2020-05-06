import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TodoItem = ({ itemId, title, completed, statusToggle, deleteTodo }) => (
  <li
    className={classNames({
      completed,
    })}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={completed}
        id={`todo-${itemId}`}
        onChange={() => statusToggle(itemId)}
      />
      <label htmlFor={`todo-${itemId}`}>
        {title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(itemId)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  statusToggle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
