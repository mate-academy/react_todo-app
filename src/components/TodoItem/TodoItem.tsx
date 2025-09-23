/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { updateTodos, deleteTodo } = useContext(TodoContext);

  const [query, setQuery] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { id, title, completed } = todo;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setShowInput(true);
    setQuery(title);
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery === title) {
      setShowInput(false);

      return;
    }

    if (trimmedQuery === '') {
      deleteTodo(id);

      setShowInput(false);

      return;
    }

    updateTodos({ ...todo, title: query.trim() });
    setShowInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowInput(false);
    }
  };

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
            updateTodos({ ...todo, completed: !completed });
          }}
        />
      </label>

      {showInput ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onBlur={handleSubmit}
            onChange={e => setQuery(e.target.value)}
            ref={inputRef}
            onKeyUp={handleKeyDown}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {title}
          <button
            type="button"
            data-cy="ForceEdit"
            onClick={handleDoubleClick}
            style={{ display: 'none' }}
          />
        </span>
      )}

      {/* Remove button appears only on hover */}
      {!showInput && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
