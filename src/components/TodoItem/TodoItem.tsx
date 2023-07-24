/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../context/TodoContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const todoContext = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  if (!todoContext) {
    return null;
  }

  const { toggleTodo, deleteTodo, updateTodoTitle } = todoContext;

  // #region #HANDLINGEVENTS
  function handleToggleTodo() {
    toggleTodo(id);
  }

  function handleDeleteTodo() {
    deleteTodo(id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleEditChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditedTitle(event.target.value);
  }

  function handleEditSubmit() {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle !== '') {
      setEditedTitle(trimmedTitle);
      setIsEditing(false);
    } else {
      deleteTodo(id);
    }

    updateTodoTitle(id, trimmedTitle);
  }

  function handleEditCancel() {
    setIsEditing(false);
  }

  function handleKeyUp(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleEditSubmit();
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  }
  // #endregion

  return (
    <li className={classNames({
      completed,
      editing: isEditing,
    })}
    >
      {!isEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${id}`}
            checked={completed}
            onChange={handleToggleTodo}
          />
          <label onDoubleClick={handleEdit}>{title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={handleDeleteTodo}
          />
        </div>
      ) : (
        <input
          type="text"
          className="edit"
          value={editedTitle}
          onChange={handleEditChange}
          onBlur={handleEditSubmit}
          onKeyUp={handleKeyUp}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      )}
    </li>
  );
};
