import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useTodos } from '../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const editRef = useRef<HTMLInputElement>(null);
  const isHandled = useRef(false);

  useEffect(() => {
    if (editing) {
      editRef.current?.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    setEditTitle(todo.title);
    setEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isHandled.current = true;
    updateTodo(todo.id, editTitle);
    setEditing(false);
  };

  const handleBlur = () => {
    if (isHandled.current) {
      isHandled.current = false;

      return;
    }

    updateTodo(todo.id, editTitle);
    setEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      isHandled.current = true;
      setEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={editRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
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
