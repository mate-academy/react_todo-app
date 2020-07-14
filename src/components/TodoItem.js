import React from 'react';
import classnames from 'classnames';
import { TodoItemShape } from '../Shapes';

const TodoItem = ({ todo, onCheck, onDelete }) => (
  <li className={classnames({ completed: todo.completed })}>
    <div className="view">
      <input
        id={todo.id}
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onCheck(todo.id)}
      />
      <label htmlFor={todo.id}>{todo.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => onDelete(todo.id)}
      />
    </div>
  </li>
);

TodoItem.propTypes = TodoItemShape.isRequired;

export default TodoItem;
