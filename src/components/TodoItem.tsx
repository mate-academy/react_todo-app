/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useTodoItem } from '../hooks/useTodoItem';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    isEditing,
    newTitle,
    saveChanges,
    handleSubmit,
    handleKeyUp,
    handleDelete,
    startEditing,
    handleTitleChange,
    handleToggle,
  } = useTodoItem(todo);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
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
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            autoFocus
            onChange={event => handleTitleChange(event.target.value)}
            onBlur={saveChanges}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEditing}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            &times;
          </button>
        </>
      )}
    </div>
  );
};
