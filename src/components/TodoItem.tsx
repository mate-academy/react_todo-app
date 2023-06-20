import classNames from 'classnames';
import React, { useState } from 'react';
import { useTodosContext } from '../context';
import '../styles/todo.scss';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { deleteTodo, editTodo, loadingTodo } = useTodosContext();

  const isLoading = todo.id && loadingTodo.includes(todo.id);

  const handleChangeTodoTitle
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setNewTitle(title);
  };

  const onSubmit = (): void => {
    if (newTitle.trim()) {
      editTodo(id, { title: newTitle });
    } else {
      deleteTodo(id);
    }

    setIsEditing(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();
    }

    if (event.key === 'Escape') {
      handleCancelEditing();
    }
  };

  const handleChangeOnBlur = () => {
    onSubmit();
  };

  return (
    <div className={classNames(
      'todo',
      { completed },
    )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => editTodo(id, { completed: !todo.completed })}
        />
      </label>

      {isEditing ? (
        <input
          type="text"
          className="todo__title-field"
          value={newTitle}
          onChange={handleChangeTodoTitle}
          onKeyDown={onKeyDown}
          onBlur={handleChangeOnBlur}
        />
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
      <div
        className={classNames(
          'modal overlay',
          { 'is-active': isLoading },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
