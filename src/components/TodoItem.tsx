import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  deleteHandler?: (todoId: number) => void,
  isProcessed: boolean,
  onUpdate?: (todoId: number, title?: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteHandler = () => {},
  isProcessed,
  onUpdate = () => {},
}) => {
  const [isFormUpdate, setIsFormUpdate] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const updateHandler = () => {
    if (!newTitle.length) {
      deleteHandler(todo.id);
    }

    if (newTitle !== todo.title && newTitle.length) {
      onUpdate(todo.id, newTitle);
    }

    setIsFormUpdate(false);
  };

  const changeStatusTodo = () => onUpdate(todo.id);
  const startEditing = () => setIsFormUpdate(true);
  const deletingTodo = () => deleteHandler(todo.id);
  const titleUpdate = () => updateHandler();
  const submitUpdetedTitle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateHandler();
  };

  const newTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const cancelEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsFormUpdate(false);
      setNewTitle(todo.title);
    }
  };

  return (
    <div
      className={classNames(
        'todo',
        { completed: todo.completed },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={changeStatusTodo}
        />
      </label>

      {isFormUpdate ? (
        <form
          onSubmit={submitUpdetedTitle}
        >
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={newTitleInput}
            onBlur={titleUpdate}
            onKeyUp={cancelEditing}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={startEditing}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={deletingTodo}
          >
            &times;
          </button>
        </>
      )}

      <div
        className={classNames(
          'modal',
          'overlay',
          { 'is-active': isProcessed },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
