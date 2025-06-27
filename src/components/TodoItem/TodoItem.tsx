import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext, InputContext } from '../GlobalState/GlobalState';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [hasDoubleClick, setHasDoubleClick] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [startTitle, setStartTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const mainInput = useContext(InputContext);

  useEffect(() => {
    if (hasDoubleClick && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasDoubleClick]);

  const dispatch = useContext(DispatchContext);

  const handleDeleteTodo = () => {
    dispatch({ type: 'deleteTodo', payload: todo.id });
  };

  const handleClick = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    dispatch?.({ type: 'editCompleted', payload: updatedTodo });
  };

  const handleDoubleClick = () => {
    setHasDoubleClick(true);
    setStartTitle(title);
    window.getSelection()?.removeAllRanges();
  };

  const handleEscapeKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTitle(startTitle);
      setHasDoubleClick(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = title.trim();

    if (trimmed === todo.title) {
      setHasDoubleClick(false);
      setTitle(trimmed);

      return;
    }

    if (trimmed === '') {
      dispatch({ type: 'deleteTodo', payload: todo.id });

      return;
    }

    dispatch({ type: 'editTitle', payload: { ...todo, title: trimmed } });
    setHasDoubleClick(false);
    setTitle(trimmed);
  };

  const handleTitleBlur = () => {
    const trimmed = title.trim();

    if (trimmed === '') {
      dispatch({ type: 'deleteTodo', payload: todo.id });

      return;
    }

    if (trimmed !== todo.title) {
      dispatch({ type: 'editTitle', payload: { ...todo, title: trimmed } });
      setTitle(trimmed);
    } else {
      setTitle(startTitle);
    }

    setHasDoubleClick(false);
    mainInput?.current?.focus();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={handleClick}
        />
      </label>

      {!hasDoubleClick ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </span>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
            onKeyDown={handleEscapeKey}
            onBlur={handleTitleBlur}
          />
        </form>
      )}

      {/* Remove button appears only on hover */}
      {!hasDoubleClick && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDeleteTodo}
        >
          ×
        </button>
      )}
    </div>
  );
};
