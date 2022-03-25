import React, { useState } from 'react';
import classNames from 'classnames';

export const TodoList = ({
  todoList,
  onCompleted,
  onRemove,
  onUpdate,
}) => {
  const [editingId, setEditingId] = useState();
  const [updatedTitle, setUpdatedTitle] = useState('');

  const handleChange = (e) => {
    if (e.key === 'Enter') {
      onUpdate(updatedTitle, editingId);
      setEditingId(-1);
    }

    if (e.key === 'Escape') {
      setEditingId(-1);
    }
  };

  return (
    <ul className="todo-list">
      {todoList.map(todo => (
        <li
          key={todo.id}
          className={classNames(
            { completed: todo.completed },
            { editing: editingId === todo.id },
          )}
          onDoubleClick={() => {
            setEditingId(todo.id);
          }}
          onBlur={() => {
            onUpdate(updatedTitle, editingId);
            setEditingId(-1);
          }}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => {
                onCompleted(todo.id);
              }}
            />
            <label>
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => {
                onRemove(todo.id);
              }}
            />
          </div>
          <input
            type="text"
            className="edit"
            value={updatedTitle || todo.title}
            onChange={(e) => {
              setUpdatedTitle(e.target.value);
            }}
            onKeyDown={handleChange}
          />
        </li>
      ))}
    </ul>
  );
};
