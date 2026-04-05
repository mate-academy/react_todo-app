import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodoActions, useTodos } from '../context/TodoContext';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, updateTodo } = useTodoActions();
  const { newTodoInputRef } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const editInputRef = useRef<HTMLInputElement>(null);
  const isEscaping = useRef(false);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setEditTitle(todo.title);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (isEscaping.current) {
      return;
    }

    const trimmed = editTitle.trim();

    if (!trimmed) {
      deleteTodo(todo.id);
    } else {
      updateTodo(todo.id, { title: trimmed });
    }

    setIsEditing(false);
    newTodoInputRef.current?.focus();
  };

  const handleEditKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      saveEdit();
    } else if (event.key === 'Escape') {
      isEscaping.current = true;
      setEditTitle(todo.title);
      setIsEditing(false);
      newTodoInputRef.current?.focus();
      isEscaping.current = false;
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

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            saveEdit();
          }}
        >
          <input
            ref={editInputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleEditKeyDown}
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
            onClick={() => {
              deleteTodo(todo.id);
              newTodoInputRef.current?.focus();
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
