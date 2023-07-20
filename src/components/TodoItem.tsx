/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    toggleTodoComplete,
    deleteTodoFromList,
    editTodoTitile,
  } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const saveChanges = () => {
    editTodoTitile(todo.id, title);
    setIsEditing(false);
  };

  const handleCancelEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.key === 'Escape') {
      setTitle(todo.title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      saveChanges();
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          onChange={() => toggleTodoComplete(todo.id)}
          checked={todo.completed}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodoFromList(todo.id)}
        />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyUp={e => handleCancelEdit(e)}
          onBlur={saveChanges}
          autoFocus
        />
      )}
    </li>
  );
};

export default TodoItem;
