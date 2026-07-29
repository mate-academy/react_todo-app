import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useTodos } from '../context/TodosContext';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => void;
  onFocusNewTodo?: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onFocusNewTodo,
}) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const isCancelledRef = useRef(false);

  const handleSave = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (isCancelledRef.current || !isEditing) {
      return;
    }

    setIsEditing(false);

    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      onDelete(todo.id);

      return;
    }

    if (trimmedTitle !== todo.title) {
      dispatch({
        type: 'RENAME',
        payload: { id: todo.id, title: trimmedTitle },
      });
    }

    onFocusNewTodo?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      isCancelledRef.current = true;
      setEditingTitle(todo.title);

      setIsEditing(false);
      onFocusNewTodo?.();
    }
  };

  const handleBlur = () => {
    if (!isEditing) {
      return;
    }

    if (isEditing && editingTitle !== todo.title) {
      handleSave();
    } else {
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditingTitle(todo.title);
    isCancelledRef.current = false;
  };

  useEffect(() => {
    setEditingTitle(todo.title);
  }, [todo.title]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleSave}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={e => setEditingTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
