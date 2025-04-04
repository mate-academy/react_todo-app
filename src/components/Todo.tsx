/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useRef, useEffect } from 'react';
import { TodoType } from '../types/TodoType';
import classNames from 'classnames';
import { TodoContext } from '../context/TodoProvider';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const { setTodos } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(e => e.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(e => (e.id === id ? { ...e, completed: !e.completed } : e)),
    );
  };

  const cancelEditing = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const saveTitle = () => {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle === '') {
      handleDelete(todo.id);
    } else {
      setTodos(prev =>
        prev.map(e => (e.id === todo.id ? { ...e, title: trimmedTitle } : e)),
      );
    }

    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveTitle();
    } else if (event.key === 'Escape') {
      cancelEditing();
    }
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
          defaultChecked={todo.completed}
          onChange={() => handleToggle(todo.id)}
        />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          className="todoapp__new-todo__edit"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onBlur={saveTitle}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDelete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
