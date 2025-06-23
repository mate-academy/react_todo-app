import React, { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const { filteredTodos, toggleTodo, removeTodo, editTodo } = useTodoContext();
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [updatedTodoId, setUpdatedTodoId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (updatedTodoId !== null) {
      inputRef.current?.focus();
    }
  }, [updatedTodoId]);

  const handleUpdateTodo = () => {
    if (updatedTodoId === null) {
      return;
    }

    if (newTodoTitle.trim() === '') {
      removeTodo(updatedTodoId);
    } else {
      editTodo(updatedTodoId, newTodoTitle.trim());
    }

    setUpdatedTodoId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, title) => {
    e.preventDefault();

    if (e.key === 'Escape') {
      setUpdatedTodoId(null);
      setNewTodoTitle(title);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(({ id, title, completed }) => (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed: completed,
          })}
          key={id}
        >
          <label className="todo__status-label">
            {/* eslint-disable jsx-a11y/label-has-associated-control */}
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => toggleTodo(id)}
            />
          </label>

          {updatedTodoId !== id ? (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setUpdatedTodoId(id);
                setNewTodoTitle(title);
              }}
            >
              {title}
            </span>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleUpdateTodo();
              }}
            >
              <input
                ref={inputRef}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTodoTitle}
                onChange={e => setNewTodoTitle(e.target.value)}
                onBlur={handleUpdateTodo}
                onKeyDown={e => {
                  handleKeyDown(e, title);
                }}
              />
            </form>
          )}

          {updatedTodoId !== id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => removeTodo(id)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
