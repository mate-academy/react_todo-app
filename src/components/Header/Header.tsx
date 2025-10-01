import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toggleAll: () => void;
  loading: boolean;
  hasTodos: boolean;
  focusTrigger: number;
  todos: Todo[];
};

export const Header: React.FC<Props> = ({
  query,
  setQuery,
  handleSubmit,
  toggleAll,
  loading,
  hasTodos,
  focusTrigger,
  todos,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading, focusTrigger]);

  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(t => t.completed),
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
          value={query}
          placeholder="What needs to be done?"
          disabled={loading}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
