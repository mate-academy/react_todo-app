import React, { memo, useCallback, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { ActionType, useTodos } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  setEditingId: (id: number | null) => void;
  onDelete: () => void;
}

const TodoItemComponent: React.FC<TodoItemProps> = ({
  todo,
  isEditing,
  setEditingId,
  onDelete,
}) => {
  const { dispatch } = useTodos();
  const [newTitle, setNewTitle] = useState(todo.title);

  useEffect(() => {
    setNewTitle(todo.title);
  }, [todo.title]);

  const handleSave = useCallback(() => {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === todo.title) {
      setEditingId(null);

      return;
    }

    if (trimmedTitle) {
      dispatch({
        type: ActionType.Edit,
        payload: {
          id: todo.id,
          title: trimmedTitle,
        },
      });
    } else {
      dispatch({
        type: ActionType.Remove,
        payload: {
          id: todo.id,
        },
      });
    }

    setEditingId(null);
  }, [newTitle, todo.id, todo.title, dispatch, setEditingId]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSave();
      }

      if (event.key === 'Escape') {
        setNewTitle(todo.title);
        setEditingId(null);
      }
    },
    [handleSave, setEditingId, todo.title],
  );

  const handleDelete = useCallback(() => {
    dispatch({
      type: ActionType.Remove,
      payload: {
        id: todo.id,
      },
    });
    onDelete();
  }, [todo.id, dispatch, onDelete]);

  const handleToggle = useCallback(() => {
    dispatch({
      type: ActionType.Toggle,
      payload: {
        id: todo.id,
      },
    });
  }, [todo.id, dispatch]);

  const isCompleted = todo.completed;

  const inputId = `todo-${todo.id}`;

  return (
    <div
      data-cy="Todo"
      className={
        isEditing ? 'todo editing' : isCompleted ? 'todo completed' : 'todo'
      }
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={inputId}>
        <input
          data-cy="TodoStatus"
          id={inputId}
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
          onChange={handleToggle}
          disabled={isEditing}
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditingId(todo.id)}
          >
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export const TodoItem = memo(TodoItemComponent);
