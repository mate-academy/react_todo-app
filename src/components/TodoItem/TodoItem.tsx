import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { deleteTodoOnServer, updateTodoOnServer } from '../../api/todos';

import { Todo } from '../../types/Todo';
import { OnChangeFunc } from '../../types/OnChangeFunc';
import { OnShowErrorFunc } from '../../types/OnErrorFunc';
import { ErrorType } from '../../enums/ErrorType';

type Props = {
  todo: Todo;
  isLoading: boolean;
  onDeleteTodo?: (todoId: number) => void;
  onChangeTodo?: OnChangeFunc;
  showError?: OnShowErrorFunc;
  hideError?: () => void;
};

export const TodoItem: React.FC<Props> = React.memo(
  ({
    todo,
    isLoading,
    onDeleteTodo = () => {},
    onChangeTodo = () => {},
    showError = () => {},
    hideError = () => {},
  }) => {
    const { id, title, completed } = todo;

    const [isWaiting, setIsWaiting] = useState(false);
    const [isEditAllowed, setIsEditAllowed] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const editFormRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (editFormRef.current && isEditAllowed) {
        editFormRef.current.focus();
      }
    }, [isEditAllowed]);

    const handleDeleteTodo = async (onError?: () => void) => {
      hideError();
      setIsWaiting(true);

      try {
        await deleteTodoOnServer(id);

        onDeleteTodo(id);
      } catch {
        showError(ErrorType.Delete);
        setIsWaiting(false);

        onError?.();
      }
    };

    const handleChangeTodo: OnChangeFunc = async (
      todoId,
      propName,
      newPropValue,
      onError,
    ) => {
      hideError();
      setIsWaiting(true);

      try {
        await updateTodoOnServer(todoId, { [propName]: newPropValue });

        onChangeTodo(todoId, propName, newPropValue);
      } catch {
        showError(ErrorType.Update);

        onError?.();
      } finally {
        setIsWaiting(false);
      }
    };

    const handleStatusChange = () => {
      handleChangeTodo(id, 'completed', !completed);
    };

    const handleTitleChange = () => {
      const newTitle = editedTitle.trim();

      setIsEditAllowed(false);
      setEditedTitle(newTitle);

      if (newTitle === title) {
        return;
      }

      const onError = () => {
        setEditedTitle(title);
      };

      if (!newTitle) {
        handleDeleteTodo(onError);

        return;
      }

      handleChangeTodo(id, 'title', newTitle, onError);
    };

    const cancelTitleChange = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key !== 'Escape') {
        return;
      }

      setIsEditAllowed(false);
      setEditedTitle(title);
    };

    return (
      <div
        className={classNames('todo', {
          'todo--completed': completed,
        })}
      >
        <label
          className={classNames('todo__status-label', {
            'todo__status-label--hidden': isEditAllowed,
          })}
        >
          <input
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={handleStatusChange}
          />
        </label>

        {isEditAllowed ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();

              handleTitleChange();
            }}
          >
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
              onBlur={handleTitleChange}
              onKeyUp={cancelTitleChange}
              ref={editFormRef}
            />
          </form>
        ) : (
          <>
            <span
              role="button"
              tabIndex={0}
              aria-label="Press Enter to edit the title"
              className="todo__title"
              onKeyUp={(event) => {
                if (event.key !== 'Enter') {
                  return;
                }

                setIsEditAllowed(true);
              }}
              onDoubleClick={() => setIsEditAllowed(true)}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              onClick={() => handleDeleteTodo()}
              aria-label="Press Enter to delete the todo"
            >
              {'\u00d7'}
            </button>
          </>
        )}

        <div
          className={classNames('modal', 'overlay', {
            'is-active': isLoading || isWaiting,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  },
);
