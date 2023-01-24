import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
  isTemp: boolean;
  onRemove: (todoId: number) => void
  isEditing: boolean
  onStatusChange: (todoId: number, data: boolean) => void;
  onTitleChange: (todoId: number, title: string) => void;
};

export const ToDo: React.FC<Props> = ({
  todo,
  isTemp,
  onRemove,
  isEditing,
  onStatusChange,
  onTitleChange,
}) => {
  const { title, completed, id = 0 } = todo;
  const [editorMode, setEditorMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const todoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [editorMode]);

  const handleCompleteToggler = (e: React.ChangeEvent<HTMLInputElement>) => (
    onStatusChange(id, e.target.checked)
  );

  const handleChangeDiscard = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditorMode(false);
      setNewTitle(title);
    }
  };

  const handleTitleUpdate = (
    e: React.FocusEvent<HTMLInputElement, Element>
    | React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setEditorMode(false);
    if (title === newTitle) {
      return;
    }

    onTitleChange(id, newTitle);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed },
      )}
    >

      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleCompleteToggler}
        />
      </label>

      {!editorMode
        ? (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setEditorMode(true)}
            >
              {title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
              onClick={() => onRemove(id)}
            >
              ×
            </button>
          </>
        ) : (
          <form onSubmit={handleTitleUpdate}>
            <input
              type="text"
              data-cy="TodoTitleField"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTitle}
              ref={todoField}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={handleChangeDiscard}
              onBlur={handleTitleUpdate}
            />
          </form>
        )}

      <div
        data-cy="TodoLoader"
        className={classNames(
          'modal',
          'overlay',
          { 'is-active': isTemp || isEditing },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
