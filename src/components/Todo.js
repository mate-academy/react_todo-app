import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Todo = ({
  todo,
  editTodo,
  editCurrentTitle,
  handleEditingTitle,
  deleteTodo,
  changeStatus,
}) => (
  <li className={classNames({
    view: true,
    editing: todo.edited,
    completed: todo.completed,
  })}
  >
    <div className="view">
      <input
        id={todo.id}
        type="checkbox"
        className="toggle"
        onChange={() => changeStatus(todo.id)}
        checked={todo.completed}
      />
      <label
        htmlFor={todo.id}
        onDoubleClick={() => editTodo(todo.id, todo.title)}
      >
        {todo.title}
      </label>
      <button
        type="button"
        id={todo.id}
        className="destroy"
        onClick={deleteTodo}
      />
    </div>
    <input
      type="text"
      id={todo.id}
      className="edit"
      defaultValue={todo.title}
      onChange={editCurrentTitle}
      onKeyDown={handleEditingTitle}
      onBlur={handleEditingTitle}
    />
  </li>
);

Todo.propTypes = {
  editCurrentTitle: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  handleEditingTitle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    edited: PropTypes.bool,
  }).isRequired,
};
