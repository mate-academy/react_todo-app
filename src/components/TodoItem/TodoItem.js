import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function TodoItem({ todo, changeStatus, deleteTodo }) {
  const [editingId, setEditingId] = useState('');
  // const [labelValue, setlabelValue] = useState('');

  // const updateTodoTitle = () => {
  // }

  return (
    <li
      className={classNames({
        completed: todo.completed, editing: editingId === todo.id,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          value={todo.id}
          onClick={event => changeStatus(event.target.value)}
          checked={todo.completed}
        />
        <label
          onDoubleClick={() => setEditingId(todo.id)}
          // value={labelValue}
          // onBlur={updateTodoTitle}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}

TodoItem.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
