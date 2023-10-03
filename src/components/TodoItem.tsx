import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({
  item,
}) => {
  const {
    deleteTodo,
    toggleCompleted,
    editTodo,
  } = useContext(TodosContext);

  const { id, title, completed } = item;

  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  const inputRef = useRef(null);

  function handleDoubleClick() {
    setIsTodoEditing(true);
    setEditTitle(title);
  }

  function handleEditSubmit() {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle) {
      editTodo(id, trimmedTitle);
      setIsTodoEditing(false);
    } else {
      deleteTodo(id);
    }
  }

  function handleEditCancel() {
    setIsTodoEditing(false);
    setEditTitle(title);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleEditSubmit();
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  }

  return (
    <li
      className={classNames(
        { completed },
        { editing: isTodoEditing },
      )}
    >
      {!isTodoEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${id}`}
            onClick={() => toggleCompleted(id)}
            checked={completed}
          />
          <label onDoubleClick={handleDoubleClick}>
            {title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="deleteTodo"
            onClick={() => deleteTodo(id)}
          />
        </div>
      ) : (
        <input
          type="text"
          className="edit"
          ref={inputRef}
          value={editTitle}
          placeholder="Empty todo will be deleted"
          onChange={event => setEditTitle(event.target.value)}
          onKeyUp={handleKeyDown}
          onBlur={handleEditSubmit}
        />
      )}
    </li>
  );
};
