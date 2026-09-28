/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { Todo as TodoType } from '../../types/Todo';
import cn from 'classnames';
import { useTodos } from '../../context/TodoContext';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, renameTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editTitleInputRef.current?.focus();
    }
  }, [isEditing]);

  function handleDoubleClick() {
    setIsEditing(true);
    setNewTitle(todo.title);
  }

  function save() {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!trimmedTitle) {
      deleteTodo(todo.id);
      setIsEditing(false);

      return;
    }

    renameTodo(todo.id, trimmedTitle);
    setIsEditing(false);
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save();
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  }

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={event => handleOnSubmit(event)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            ref={editTitleInputRef}
            onChange={event => setNewTitle(event.target.value)}
            onKeyUp={event => handleKeyUp(event)}
            onBlur={save}
          />
        </form>
      ) : (
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
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
