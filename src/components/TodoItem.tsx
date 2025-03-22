/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodoContext } from './SetTodosContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, title, id } = todo;

  const todoContext = useContext(TodoContext);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [editQuery, setEditQuery] = useState(title);

  if (!todoContext) {
    return null;
  }

  const { removeTodo, todoToggle } = todoContext;

  const handleSave = () => {
    if (!editQuery.trim()) {
      removeTodo(id);
    }

    todoToggle({ ...todo, title: editQuery.trim() });
    setIsDoubleClick(false);

    return;
  };

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }

    if (event.key === 'Escape') {
      setEditQuery(title);
      setIsDoubleClick(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => todoToggle({ ...todo, completed: !completed })}
        />
      </label>

      {isDoubleClick ? (
        <form onSubmit={e => e.preventDefault()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editQuery}
            onChange={e => setEditQuery(e.target.value)}
            onKeyDown={e => keyDown(e)}
            onBlur={handleSave}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsDoubleClick(true)}
          >
            {title.trim()}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
