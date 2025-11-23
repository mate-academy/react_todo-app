import React, { FC, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useTodosActions } from '../../hooks/useTodosActions';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = React.memo(function TodoItem({ todo }) {
  const { title, id, completed } = todo;

  const dispatch = useTodosActions();

  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, seTempTitle] = useState(title);

  const todoRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleToggleStatus = () => {
    dispatch({ type: 'toggleTodoStatus', payload: id });
  };

  const handleRemoveTodo = () => {
    dispatch({ type: 'removeTodo', payload: id });
  };

  const handleChangeTempTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    seTempTitle(event.target.value);
  };

  const handleSubmitEditForm = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = tempTitle.trim();

    if (trimmedTitle === '') {
      handleRemoveTodo();

      return;
    }

    dispatch({
      type: 'updateTodoTitle',
      payload: { id, title: trimmedTitle, completed },
    });
  };

  const handleEscClick = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      seTempTitle(title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const handleDblClick = (event: MouseEvent) => {
      event.preventDefault();

      setIsEditing(true);
    };

    const currentTodoRef = todoRef.current;

    currentTodoRef?.addEventListener('dblclick', handleDblClick);

    return () => {
      currentTodoRef?.removeEventListener('dblclick', handleDblClick);
    };
  }, []);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setIsEditing(false);
  }, [todo]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
      ref={todoRef}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggleStatus}
        />
      </label>

      {!isEditing && (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {tempTitle.trim()}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemoveTodo}
          >
            ×
          </button>
        </>
      )}

      {isEditing && (
        <form onSubmit={handleSubmitEditForm}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={tempTitle}
            onChange={handleChangeTempTitle}
            ref={editInputRef}
            onKeyUp={handleEscClick}
            onBlur={handleSubmitEditForm}
          />
        </form>
      )}
    </div>
  );
});
