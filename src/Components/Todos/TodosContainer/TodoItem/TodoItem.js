import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TodoItem = ({ todo, deleteTodo, isCompleted }) => {
  const completedClassToggle = classNames('', { completed: todo.completed });

  return (
    <li className={completedClassToggle}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todo.id}
          onClick={() => isCompleted(todo.id)}
          checked={todo.completed}
          onChange={(e) => {}}
        />
        <label htmlFor={todo.id}>{todo.text}</label>
        <button
          onClick={() => deleteTodo(todo.id)}
          type="button"
          className="destroy"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  isCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
