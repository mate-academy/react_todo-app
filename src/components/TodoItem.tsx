import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodosContext } from '../hooks/useTodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const { setTodos } = useTodosContext();

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [query, setQuery] = useState(title);

  const handleStatusChange = () => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleDelete = () => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const handleSubmit = () => {
    if (!query.trim()) {
      handleDelete();

      return;
    }

    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, title: query.trim() } : t)),
    );
    setIsBeingEdited(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery(title);
      setIsBeingEdited(false);
    }
  };

  return (
    <div data-cy="Todo" className={`todo${completed ? ' completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => handleStatusChange()}
          aria-labelledby={`todo-label-${id}`}
          checked={completed}
        />
      </label>

      {isBeingEdited ? (
        <form onSubmit={handleFormSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onBlur={handleSubmit}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsBeingEdited(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete()}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
