import React, { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../todo_items/todo';
import { MethodsContext } from '../../TodoContext';

interface Props {
  todo: Todo;
}

export const TodoList: React.FC<Props> = ({ todo }) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  const { id, title, completed } = todo;

  const methods = useContext(MethodsContext);
  const fieldRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const trimmed = newTitle.trim();

    if (trimmed) {
      methods.renameTodo(id, trimmed);
    } else {
      methods.handleDelete(id);
    }

    setEditing(false);
  };

  useEffect(() => {
    if (editing) {
      setNewTitle(title);
      fieldRef.current?.focus();
    }
  }, [editing, title]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => methods.handleComplete(id)}
        />
      </label>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={fieldRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={save}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setEditing(false);
              }
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditing(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => methods.handleDelete(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
