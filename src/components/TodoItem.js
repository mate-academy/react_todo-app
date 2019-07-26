import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, changeTodoCompleted, destroyTodo }) => (
  <li className="">
    <div className="view">
      <input
        id={todo.id}
        onClick={() => changeTodoCompleted(todo.id)}
        type="checkbox"
        checked={todo.completed}
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
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  changeTodoCompleted: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};

export default TodoItem;
