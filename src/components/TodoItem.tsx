/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import type { Todo } from '../types/todo';
import { useTodos } from '../context/TodosContext';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);

  useEffect(() => {
    if (!isEditing) {
      setTempTitle(todo.title);
    }
  }, [todo.title, isEditing]);

  const startEdit = () => {
    setIsEditing(true);
    setTempTitle(todo.title);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setTempTitle(todo.title);
  };

  const commitEdit = () => {
    updateTodo(todo.id, tempTitle);
    setIsEditing(false);
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {!isEditing && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEdit}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              deleteTodo(todo.id);
              setTimeout(() => {
                const input = document.querySelector<HTMLInputElement>(
                  '[data-cy="NewTodoField"]',
                );

                input?.focus();
              }, 0);
            }}
          >
            ×
          </button>
        </>
      )}

      {isEditing && (
        <form
          onSubmit={e => {
            e.preventDefault();
            commitEdit();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={tempTitle}
            onChange={e => setTempTitle(e.target.value)}
            onBlur={commitEdit}
            onKeyUp={onKeyUp}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
