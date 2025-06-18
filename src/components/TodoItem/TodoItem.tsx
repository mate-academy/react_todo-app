/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';
import { Todo } from '../../entities/Todo';
import { useTodoContext } from '../../hooks/useTodos';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const { toggleTodo, removeTodo, editTodo, focusAddInput } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const input = inputRef.current;

      input.focus();

      const value = input.value;

      input.value = '';
      input.value = value;
    }
  }, [isEditing]);

  const saveEdit = () => {
    const trimmed = editValue.trim();

    if (trimmed) {
      editTodo(todo.id, trimmed);
    } else {
      removeTodo(todo.id);
    }

    setIsEditing(false);
    if (focusAddInput) {
      focusAddInput();
    }
  };

  const cancelEdit = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      cancelEdit();
    } else if (event.key === 'Enter') {
      saveEdit();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveEdit();
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          disabled={isEditing}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
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
      )}
    </div>
  );
};
