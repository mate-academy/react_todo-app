import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext } from '../../store';

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
}) => {
  const dispatch = useContext(DispatchContext);
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleDeleteTodo = () => {
    dispatch({
      type: 'delete',
      payload: id,
    });
  };

  const handleChangeCompeted = () => {
    dispatch({
      type: 'update',
      payload: {
        id: id,
        title: title,
        completed: !completed,
      },
    });
  };

  const handleShowInput = () => {
    setShowInput(true);
    setQuery(title);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      setShowInput(false);
    }
  };

  const handleChangeTodo = (e: FormEvent) => {
    e.preventDefault();

    if (query.trim() === title) {
      setShowInput(false);

      return;
    }

    if (query.length === 0) {
      dispatch({
        type: 'delete',
        payload: id,
      });

      return;
    }

    setShowInput(false);

    dispatch({
      type: 'update',
      payload: {
        id: id,
        title: query.trim(),
        completed: completed,
      },
    });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', completed ? 'completed' : '')}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={handleChangeCompeted}
        />
      </label>

      {!showInput && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleShowInput}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteTodo}
          >
            ×
          </button>
        </>
      )}

      {showInput && (
        <form
          onBlur={handleChangeTodo}
          onSubmit={handleChangeTodo}
          onKeyDown={handleEscape}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      )}
    </div>
  );
};
