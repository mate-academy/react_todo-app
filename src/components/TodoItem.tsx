/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodos } from '../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { removeTodo, updateTodo } = useTodos();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [todoTitle, setTodoTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (todoTitle.trim() === '') {
      removeTodo(id);

      return;
    }

    if (title.trim() === todoTitle.trim()) {
      setEditingTodoId(null);

      return;
    }

    updateTodo({ ...todo, title: todoTitle.trim() });

    setEditingTodoId(null);
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditingTodoId(null);
    }
  };

  useEffect(() => {
    if (editingTodoId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodoId]);

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
          onChange={() => {
            const updatedTodo = { ...todo, completed: !completed };

            updateTodo(updatedTodo);
          }}
        />
      </label>

      {editingTodoId === id ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todoTitle}
            onChange={ev => setTodoTitle(ev.target.value)}
            onBlur={handleSubmit}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              if (todo) {
                setEditingTodoId(id);
                setTodoTitle(title);
              }
            }}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => todo && removeTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
