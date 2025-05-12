/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  updateTodo: (todoId: number, updatedFields: Partial<Todo>) => void;
  deleteToDo: (todoId: number) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

export const ToDoItem: React.FC<Props> = ({
  todo,
  updateTodo,
  deleteToDo,
  isEditing,
  setIsEditing,
}) => {
  const [editTitle, setEditTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleEditFinish = () => {
    const trimmed = editTitle.trim();

    if (!trimmed) {
      deleteToDo(todo.id);

      return;
    }

    if (trimmed === todo.title) {
      setIsEditing(false);

      return;
    }

    updateTodo(todo.id, { title: trimmed });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditFinish();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
        />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onBlur={handleEditFinish}
          onKeyDown={handleKeyDown}
        />
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
            onClick={() => deleteToDo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
