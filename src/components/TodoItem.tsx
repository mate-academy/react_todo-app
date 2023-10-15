import React, {
  useContext, useEffect, useRef, useState,
} from 'react';

import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
  },
}) => {
  const { toggleTodo, removeTodo, editTodo } = useContext(TodosContext);

  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [isEdit]);

  const handleCheckedChange = () => {
    toggleTodo(id);
  };

  const handleRemoveTodo = () => {
    removeTodo(id);
  };

  const handleEditSubmit = () => {
    const trimmed = editTitle.trim();

    if (trimmed) {
      setEditTitle(trimmed);
      setIsEdit(false);
      editTodo(id, trimmed);
    } else {
      removeTodo(id);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(title);
    setIsEdit(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    }

    if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <li
      className={cn({
        editing: isEdit,
        completed: completed === true,
      })}
    >
      {isEdit ? (
        <input
          type="text"
          className="edit"
          ref={inputField}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyUp={handleKeyUp}
          onBlur={handleCancelEdit}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={String(id)}
            onChange={handleCheckedChange}
            checked={completed}
          />

          <label onDoubleClick={() => setIsEdit(true)}>
            {title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="deleteTodo"
            onClick={handleRemoveTodo}
          />

        </div>
      )}
    </li>
  );
};
