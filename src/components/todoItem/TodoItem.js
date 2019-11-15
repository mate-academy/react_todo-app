import React from 'react';
import PropTypes from 'prop-types';

function TodoItem(props) {
  const { todo, removeTodo, onCompleted } = props;

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todo.id}
          onChange={onCompleted}
          checked={todo.completed}
        />
        <label
          htmlFor={todo.id}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
}

export default TodoItem;
