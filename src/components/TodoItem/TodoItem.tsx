import React, { useEffect, useRef, useState } from 'react';
import cl from 'classnames';

import { Todo } from '../../types/Todo';
import { useTodos } from '../../hooks/useTodos';

type Props = {
  todo: Todo;
  onTodoAction: () => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onTodoAction }) => {
  const { removeTodo, toggleTodo, renameTodo } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleStatusChange = (id: number) => {
    toggleTodo(id);
    onTodoAction();
  };

  const handleRemoveTodo = (id: number) => {
    removeTodo(id);
    onTodoAction();
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setValue(todo.title);
  };

  const save = () => {
    const normalizedValue = value.trim();

    if (normalizedValue === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!normalizedValue) {
      handleRemoveTodo(todo.id);

      return;
    }

    renameTodo(todo.id, normalizedValue);
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setValue(todo.title);
      setIsEditing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save();
  };

  return (
    <div data-cy="Todo" className={cl('todo', { completed: todo.completed })}>
      <label className="todo__status-label" aria-label="Mark todo as completed">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleStatusChange(todo.id)}
        />
      </label>

      {!isEditing ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            data-cy="TodoTitleField"
            onChange={e => setValue(e.target.value)}
            className="todo__title-field"
            onBlur={save}
            onKeyUp={handleKeyUp}
            ref={inputRef}
          />
        </form>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleRemoveTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
