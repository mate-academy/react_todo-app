import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TodoItem = ({
  todo,
  handleCheck,
  handleRemove,
  filterField,
  showTodos,
}) => (
  <li className={classNames({ completed: todo.completed })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={todo.id}
        checked={todo.completed}
        onChange={event => handleCheck(
          event, todo, filterField, showTodos
        )}
      />
      <label htmlFor={todo.id}>{todo.todoTitle}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => handleRemove(todo)}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.string,
  handleCheck: PropTypes.func,
  handleRemove: PropTypes.func,
}.isRequired;

export default TodoItem;
