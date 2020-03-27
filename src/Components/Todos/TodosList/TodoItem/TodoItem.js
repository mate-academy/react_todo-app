/* eslint-disable quote-props */
/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

const TodoItem = ({ todo, deleteTodo, markCompleted }) => {
  const completedToggle = classNames('', { 'completed': todo.completed });
  const todoId = `todo-${todo.id}`;

  return (
    <li className={completedToggle}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todoId}
          onClick={markCompleted}
        />
        <label htmlFor={todoId}>{todo.text}</label>
        <button
          onClick={deleteTodo}
          type="button"
          className="destroy"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

export default TodoItem;
