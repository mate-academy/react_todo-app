import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, complete, onDelete }) => {
  const [completed, setCompleted] = useState(todo.completed);

  return (
    <li className={classNames({
      completed,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            setCompleted(!completed);
            complete(todo.id);
          }}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            onDelete(todo.id);
          }}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  complete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
