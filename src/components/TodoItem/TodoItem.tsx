import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onRemoveTodo: (todoId: number) => void,
  onUpdateTodo: (todoId: number, newTitle: string) => void,
  onChangeStatusTodo: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onRemoveTodo,
  onUpdateTodo,
  onChangeStatusTodo,
}) => {
  const [query, setQuery] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenInput = () => {
    setIsEditing(true);
    setQuery(todo.title);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setQuery(newTitle);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.length) {
      onRemoveTodo(todo.id);
    }

    if (query.trim() !== todo.title) {
      onUpdateTodo(todo.id, query.trim());
    }

    setIsEditing(false);
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setQuery(todo.title);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onClick={() => onChangeStatusTodo(todo.id)}

        />
        <label onDoubleClick={handleOpenInput}>
          {todo.title}
        </label>
        <button
          aria-label="deletetodo"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onRemoveTodo(todo.id)}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="edit"
          ref={inputRef}
          value={query}
          onChange={handleChangeTitle}
          onKeyUp={handleEscape}
          onBlur={handleSubmit}
        />
      </form>
    </li>
  );
};
