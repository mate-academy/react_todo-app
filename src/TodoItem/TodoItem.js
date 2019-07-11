import React from 'react';
import PropTypes from 'prop-types';

function TodoItem(props) {
  const {
    todo,
    deleteTodo,
    completeTodo,
  } = props;
  const completedClass = todo.completed ? 'completed' : '';

  return (
    <li className={completedClass}>
      <div className="view">
        <input
          onChange={() => completeTodo(todo.id)}
          type="checkbox"
          className="toggle"
          id={`todo-${todo.id}`}
          checked={todo.completed}
        />
        <label htmlFor={`todo-${todo.id}`}>
          {todo.title}
        </label>
        <button
          onClick={() => deleteTodo(todo.id)}
          type="button"
          className="destroy"
        />
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    completed: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
