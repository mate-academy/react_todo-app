/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/todo';
import classNames from 'classnames';
import { TodoContext } from '../../contexts/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { removeTodo, updateTodo, newTitleFieldRef } = useContext(TodoContext);
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const editTitleFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editTitleFieldRef.current?.focus();
    } else {
      newTitleFieldRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const saveEditedTitle = () => {
    const newTitle = title.trim();

    setIsEditing(false);

    if (!newTitle) {
      removeTodo(todo.id);

      return;
    }

    if (newTitle === todo.title) {
      return;
    }

    updateTodo(todo.id, { title: newTitle });
  };

  const handleEditTodoTitle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveEditedTitle();
  };

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
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
          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeTodo(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        // {/* This form is shown instead of the title and remove button */}
        <form onSubmit={handleEditTodoTitle}>
          <input
            data-cy="TodoTitleField"
            ref={editTitleFieldRef}
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.currentTarget.value)}
            onKeyDown={handleTitleKeyDown}
            onBlur={saveEditedTitle}
          />
        </form>
      )}
    </div>
  );
};
