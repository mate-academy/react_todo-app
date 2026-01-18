/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useTodos } from './services/ContextHook';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const { deleteTodo, updateTodo, mainInputRef } = useTodos();

  const editTitleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editTitleField.current?.focus();
    }
  }, [isEditing]);

  function handleNewTitle() {
    setIsEditing(true);
    setEditTitle(todo.title);
  }

  function handleRename(event: React.FormEvent) {
    event.preventDefault();

    const newEditTitle = editTitle.trim();

    if (newEditTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!newEditTitle) {
      deleteTodo(todo.id);

      return;
    }

    updateTodo({ ...todo, title: newEditTitle });
    setIsEditing(false);
  }

  const handleDelete = () => {
    deleteTodo(todo.id);

    mainInputRef.current?.focus();
  };

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);

      return;
    }
  }

  return (
    <>
      {/* This is a completed todo */}
      <div
        data-cy="Todo"
        className={classNames('todo', { completed: todo.completed })}
      >
        <label
          className="todo__status-label"
          htmlFor={`todo-status-${todo.id}`}
        >
          <input
            aria-label="Toggle todo status"
            id={`todo-status-${todo.id}`}
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
          />
        </label>

        {isEditing ? (
          <form onSubmit={handleRename}>
            <input
              ref={editTitleField}
              autoFocus
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editTitle}
              onChange={event => setEditTitle(event.target.value)}
              onBlur={handleRename}
              onKeyUp={handleKeyUp}
            />
          </form>
        ) : (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleNewTitle}
          >
            {todo.title}
          </span>
        )}

        {/* Remove button appears only on hover */}
        <button
          type="button"
          className="todo__remove"
          aria-label="Remove todo"
          data-cy="TodoDelete"
          onClick={handleDelete}
        >
          ×
        </button>
      </div>
    </>
  );
};
