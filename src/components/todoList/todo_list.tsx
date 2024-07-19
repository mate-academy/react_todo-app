import React, { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../todo_items/todo';
import { MethodsContext } from '../../TodoContext';

interface Props {
  todo: Todo;
}

export const TodoList: React.FC<Props> = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  const methods = useContext(MethodsContext);
  const fieldRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const trimmed = title.trim();

    if (trimmed) {
      methods.renameTodo(todo.id, trimmed);
    } else {
      methods.handleDelete(todo.id);
    }

    setEditing(false);
  };

  useEffect(() => {
    if (editing) {
      setTitle(todo.title);
      fieldRef.current?.focus();
    }
  }, [editing, todo.title]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => methods.handleComplete(todo.id)}
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
            value={title}
            onChange={e => setTitle(e.target.value)}
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
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => methods.handleDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
