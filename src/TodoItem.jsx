import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = (props) => {
  const {
    todo,
    handleDelete,
    handleComplete
        } = props;

  return (
    <ul className="todo-list">
      <li  className={todo.completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            onChange={() => handleComplete(todo.id)}
            checked={todo.completed}

          />
          <label htmlFor="todo">
            {todo.text}
          </label>
            <button
              type="button"
              className="destroy"
              onClick={() => handleDelete(todo.id)}
            />
        </div>
      </li>
    </ul>
  )
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

export default TodoItem;
