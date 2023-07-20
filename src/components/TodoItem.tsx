import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { ErrorMessage } from '../enums/error';
import { updateTodos } from '../api/todos';

type Props = {
  todo: Todo;
  todos: Todo[];
  deletedTodosId: number[] | [];
  handleDeletedTodo: (id: number) => void;
  handleUpdatedTodo: (id: number) => void;
  setDeletedTodosId: React.Dispatch<React.SetStateAction<number[] | []>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: React.Dispatch<React.SetStateAction<ErrorMessage>>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  deletedTodosId,
  handleDeletedTodo,
  handleUpdatedTodo,
  setDeletedTodosId,
  setTodos,
  setError,
}) => {
  const { title, completed, id } = todo;
  const isDeleted = deletedTodosId.some(todoId => todoId === id);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleEdit = () => {
    setIsEditing(false);

    if (newTitle === title) {
      return;
    }

    if (!newTitle) {
      handleDeletedTodo(id);

      return;
    }

    setDeletedTodosId([id]);

    updateTodos(id, {
      ...todo,
      title: newTitle,
    })
      .then(() => {
        const newTodoList = todos.map(t => {
          return t.id === id
            ? { ...t, title: newTitle }
            : t;
        });

        setTodos(newTodoList);
      })
      .catch(() => setError(ErrorMessage.UPDATE))
      .finally(() => setDeletedTodosId([]));
  };

  const handleChangeStatus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleTitleEdit();
  };

  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked
          onChange={() => handleUpdatedTodo(id)}
        />
      </label>

      {isEditing
        ? (
          <form onSubmit={handleChangeStatus}>
            <input
              type="text"
              className="todo__title-field"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              onBlur={handleTitleEdit}
              onKeyUp={handleInputKeyUp}
              ref={inputRef}
            />
          </form>
        ) : (
          <>
            <span
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {title}
            </span>
          </>
        )}

      <button
        type="button"
        className="todo__remove"
        onClick={() => handleDeletedTodo(id)}
      >
        ×
      </button>

      <div className={classNames(
        'modal overlay',
        {
          'is-active': isDeleted,
        },
      )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
