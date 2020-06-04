import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Todo = ({
  todo,
  clearTodo,
  handlerStatus,
}) => (
  <li className={classNames({
    view: true,
    editing: todo.edited,
    completed: todo.isTodoCompleted,
  })}
  >
    <div className="view">
      <input
        id={todo.id}
        type="checkbox"
        className="toggle"
        onChange={() => handlerStatus(todo.id)}
        checked={todo.isTodoCompleted}
      />
      <label
        htmlFor={todo.id}
      >
        {todo.title}
      </label>
      <button
        type="button"
        id={todo.id}
        className="destroy"
        onClick={clearTodo}
      />
    </div>
    <input
      type="text"
      className="edit"
    />
  </li>
);

Todo.propTypes = {
  clearTodo: PropTypes.func.isRequired,
  handlerStatus: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    isTodoCompleted: PropTypes.bool,
    edited: PropTypes.bool,
  }).isRequired,
};

export default Todo;
