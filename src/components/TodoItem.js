import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
  const { todo, deleteTodo, checkTodo } = props;

  return (
    <li className={todo.completed && 'completed'}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todo.id}
          onChange={event => checkTodo(event.target.checked)}
          checked={todo.completed}
        />
        <label
          htmlFor={todo.id}
          className={todo.completed && 'checked'}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={deleteTodo}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
};
