import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TodoItem = ({ todo, deleteTodo, changeComplete }) => (
  <li
    key={todo.id}
    className={classNames({ completed: todo.completed })}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        onChange={() => changeComplete(todo.id)}
      />
      <label>{todo.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(todo.id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.objectOf().isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeComplete: PropTypes.func.isRequired,
};

export default TodoItem;
