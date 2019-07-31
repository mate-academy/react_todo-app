import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, changeTodoCompleted, destroyTodo }) => (
  <li className="">
    <div className="view">
      <input
        id={todo.id}
        type="checkbox"
        onClick={() => changeTodoCompleted(todo.id)}
        defaultChecked={todo.completed}
        className="toggle"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label
        className={classnames({ 'todo-completed': todo.completed })}
        htmlFor="todo-1"
      >
        {todo.title}
      </label>
      <button
        onClick={() => destroyTodo(todo.id)}
        type="button"
        className="destroy"
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
  destroyTodo: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTodoCompleted: PropTypes.func.isRequired,
};

export default TodoItem;
