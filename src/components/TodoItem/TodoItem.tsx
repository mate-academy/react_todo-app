/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useTodosContext } from '../../contexts/TodosContext';

export type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');

  const { actions } = useTodosContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleEdit(
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement, Element>,
  ) {
    event.preventDefault();
    if (!currentTitle.trim()) {
      actions.delete(todo.id);

      return;
    }

    actions.update({
      ...todo,
      title: currentTitle.trim(),
    });
    setIsEditing(false);
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            actions.update({
              ...todo,
              completed: !todo.completed,
            });
          }}
        />
      </label>

      {!isEditing && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setIsEditing(true);
            setCurrentTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      )}

      {isEditing && (
        <form>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={currentTitle}
            onChange={e => setCurrentTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleEdit(e);
              }

              if (e.key === 'Escape') {
                setIsEditing(false);
              }
            }}
          />
        </form>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => actions.delete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
