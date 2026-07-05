/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const focusNewTodoField = () => {
    (
      document.querySelector(
        '[data-cy="NewTodoField"]',
      ) as HTMLInputElement | null
    )?.focus();
  };

  const handleDelete = () => {
    setTodos(todos.filter(item => item.id !== todo.id));

    setTimeout(() => {
      focusNewTodoField();
    });
  };

  const handleToggle = () => {
    setTodos(
      todos.map(item => (
        item.id === todo.id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )),
    );
  };

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      handleDelete();

      return;
    }

    setTodos(
      todos.map(item => (
        item.id === todo.id
          ? {
              ...item,
              title: trimmedTitle,
            }
          : item
      )),
    );

    setIsEditing(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
   ) => {
    if (event.key === 'Enter') {
      handleSave();
    }

    if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          value={editedTitle}
          onChange={event => setEditedTitle(event.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDelete}
        >
          ×
        </button>
      )}
    </div>
  );
};
