/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import { useTodos } from './TodosContext';
import { Todo } from './types/Todo';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { toggleTodo, removeTodo, editTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      titleField.current?.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setText(todo.title);
    setIsEditing(true);
  };

  const submit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    editTodo(todo.id, text);
    setIsEditing(false);
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Escape') {
      setText(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div data-cy="Todo" className={`todo${todo.completed ? ' completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={startEditing}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeTodo(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={submit}>
          <input
            ref={titleField}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={submit}
            onKeyUp={onKeyUp}
          />
        </form>
      )}
    </div>
  );
};
