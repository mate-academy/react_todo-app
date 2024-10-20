import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';
import { Todo } from '../../types/Todo';
import { useTodoContext } from '../context/TodoContext';

type Props = {
  todo: Todo;
  isLoading?: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isLoading: externalLoading = false,
}) => {
  const { dispatch, state } = useTodoContext();
  const { deletingTodoIds } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodoTitle, setEditedTodoTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDelete = () => {
    setIsLoading(true);
    try {
      dispatch({ type: 'DELETE_TODO', payload: todo.id });
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: Error.unableToDelete,
      });
      setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    setIsLoading(true);
    try {
      dispatch({
        type: 'UPDATE_TODO',
        payload: { ...todo, completed: !todo.completed },
      });
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: Error.unableToUpdate,
      });
      setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newTitle: string) => {
    setIsLoading(true);
    if (newTitle.trim() === todo.title) {
      setIsEditing(false);
      setIsLoading(false);

      return;
    }

    if (newTitle.trim() === '') {
      handleDelete();

      return;
    }

    try {
      dispatch({
        type: 'UPDATE_TODO',
        payload: { ...todo, title: newTitle.trim() },
      });
      setIsEditing(false);
    } catch {
      inputRef.current?.focus();
      dispatch({
        type: 'SET_ERROR',
        payload: Error.unableToUpdate,
      });
      setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        {' '}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>

          <button
            onClick={handleDelete}
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleEdit(editedTodoTitle);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTodoTitle}
            onChange={e => setEditedTodoTitle(e.target.value)}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setEditedTodoTitle(todo.title);
                setIsEditing(false);
              }
            }}
            onBlur={() => handleEdit(editedTodoTitle)}
            ref={inputRef}
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active':
            isLoading || externalLoading || deletingTodoIds.includes(todo.id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
