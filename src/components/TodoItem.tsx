import {
  useEffect,
  useRef,
  useState,
  type FC,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import classNames from 'classnames';

import { useTodos } from '../context/TodosContext';
import type { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onDelete: (todoId: number) => void;
}

export const TodoItem: FC<Props> = ({ todo, onDelete }) => {
  const { toggleTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const titleFieldRef = useRef<HTMLInputElement>(null);
  const isSavingRef = useRef(false);
  const isCancellingRef = useRef(false);

  useEffect(() => {
    if (isEditing) {
      titleFieldRef.current?.focus();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    isSavingRef.current = false;
    isCancellingRef.current = false;
    setEditedTitle(todo.title);
    setIsEditing(true);
  };

  const saveChanges = () => {
    if (isSavingRef.current) {
      return;
    }

    isSavingRef.current = true;

    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle) {
      updateTodo(todo.id, trimmedTitle);
    } else {
      onDelete(todo.id);
    }

    setIsEditing(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveChanges();
  };

  const handleCancelEditing = () => {
    isCancellingRef.current = true;
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleCancelEditing();
    }
  };

  const handleBlur = () => {
    if (!isCancellingRef.current) {
      saveChanges();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label
        className="todo__status-label"
        htmlFor={`todo-status-${todo.id}`}
        aria-label="Toggle todo"
      >
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={titleFieldRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={event => setEditedTitle(event.target.value)}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            role="button"
            tabIndex={0}
            onDoubleClick={handleStartEditing}
            onKeyUp={event => {
              if (event.key === 'Enter') {
                handleStartEditing();
              }
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete ${todo.title}`}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
