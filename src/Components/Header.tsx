/* eslint-disable no-console */
import classNames from 'classnames';
import { TodoContext } from './TodoContext';
import React, { useEffect, useRef } from 'react';

export const Header: React.FC = () => {
  const { todos, title, setTitle, setError, toggleAll, loading, submitForm } =
    React.useContext(TodoContext)!;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos, loading]);

  const areAllTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {!loading && todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}
      <form onSubmit={submitForm}>
        <input
          ref={inputRef}
          autoFocus
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setError(null);
          }}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={loading}
        />
      </form>
    </header>
  );
};
