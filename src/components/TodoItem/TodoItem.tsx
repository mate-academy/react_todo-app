import React, {
  ChangeEvent, KeyboardEvent, FormEvent, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { CustomForm } from '../CustomForm';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => void,
  onUpdate: (id: number, data: Partial<Todo>) => void;
  loadedTodoIds: number[],
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onUpdate,
  loadedTodoIds,
}) => {
  const { id, title, completed } = todo;

  const [changedTitle, setChangedTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);

  const isActiveTodo = loadedTodoIds.includes(id);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleIsCompletedChange = () => {
    onUpdate(id, { completed: !completed });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedTitle(event.target.value);
  };

  const handleEditChange = () => {
    setIsEdit(prevState => !prevState);
  };

  const closeEditMode = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setChangedTitle(title);
      setIsEdit(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!changedTitle.trim()) {
      onDelete(id);
    } else if (title !== changedTitle) {
      onUpdate(id, { title: changedTitle });
    }

    setIsEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  return (
    <div className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleIsCompletedChange}
        />
      </label>

      {isEdit
        ? (
          <CustomForm
            onSubmit={handleSubmit}
            className="todo__title-field"
            type="text"
            placeholder="Empty todo will deleted"
            value={changedTitle}
            onBlur={handleSubmit}
            onChange={handleTitleChange}
            onKeyUp={closeEditMode}
            ref={inputRef}
          />
        )
        : (
          <>
            <span
              className="todo__title"
              onDoubleClick={handleEditChange}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              onClick={() => onDelete(id)}
            >
              ×
            </button>
          </>
        )}

      <div className={classNames('modal overlay', {
        'is-active': isActiveTodo,
      })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
