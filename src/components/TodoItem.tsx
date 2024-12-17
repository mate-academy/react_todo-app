import cn from 'classnames';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext } from '../context/GlobalContextProvider';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [beingEdited, setBeingEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  // Handling enabling input field on double click
  const handleDoubleClick = useCallback(() => {
    if (!beingEdited) {
      setBeingEdited(true);
    }
  }, [beingEdited]);

  // Handling TODO status change
  const toggleTodoStatus = useCallback(() => {
    dispatch({
      type: 'updateTodo',
      payload: { ...todo, completed: !todo.completed },
    });
  }, [dispatch, todo]);

  // Handling deleting TODO on the server
  const handleDeleteEvent = useCallback(
    (id: number) => {
      dispatch({ type: 'deleteTodo', payload: id });
    },
    [dispatch],
  );

  // Hanldling completion of TODO edit
  const handleTitleChangeUpdate = useCallback(() => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      handleDeleteEvent(todo.id); // delete TODO if its title erased
    } else {
      dispatch({
        type: 'updateTodo',
        payload: { ...todo, title: trimmedTitle },
      });
      setEditedTitle(trimmedTitle);
    }

    // remove field when editing completed
    setBeingEdited(false);
  }, [editedTitle, dispatch, handleDeleteEvent, todo]);

  // Handling completion of edit on Enter key
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTitleChangeUpdate();
  };

  // Handling cancellation of edit on Escape key
  const onEsc = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setEditedTitle(todo.title);
        setBeingEdited(false);
      }
    },
    [todo],
  );

  // Handling edit input losing focus
  const onBlur = useCallback(() => {
    if (inputRef.current) {
      handleTitleChangeUpdate();
    }
  }, [handleTitleChangeUpdate]);

  return (
    <div
      data-cy="Todo"
      onDoubleClick={handleDoubleClick}
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      {/* TODO STATUS */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={toggleTodoStatus}
          checked={todo.completed}
        />
      </label>

      {/* TODO TITLE / EDIT TODO FIELD */}
      {beingEdited ? (
        <form onSubmit={onSubmit}>
          <input
            data-cy="TodoTitleField"
            ref={inputRef}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onKeyUp={onEsc}
            onBlur={onBlur}
            autoFocus
          />
        </form>
      ) : (
        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
      )}

      {/* DELETE TODO */}
      {!beingEdited && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDeleteEvent(todo.id)}
        >
          ×
        </button>
      )}

      {false && (
        <div
          data-cy="TodoLoader"
          className={cn('modal', 'overlay', {
            'is-active': false,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
