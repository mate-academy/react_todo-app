import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useTodos } from '../../context/TodoContext';

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoHeader: React.FC<Props> = ({
  query,
  onQueryChange,
  inputRef,
}) => {
  const { todos, addTodo, toggleAll, allCompleted, error, setError } =
    useTodos();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      setError('Title should not be empty');

      return;
    }

    addTodo(trimmed);
  };

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error, setError]);

  return (
    <>
      <header className="todoapp__header">
        {todos.length > 0 && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: allCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
          />
        )}

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={event => onQueryChange(event.target.value)}
            disabled={false}
          />
        </form>
      </header>
      {/* {error && (
        <p
          className="help is-danger"
          data-cy="ErrorMessage"
          style={{ color: `red` }}
        >
          {error}
        </p>
      )} */}
    </>
  );
};
