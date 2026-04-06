import classNames from 'classnames';
import { TodoContext } from '../context/TodoContext';
import React, { useContext } from 'react';

interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  query: string;
  setQuery: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Header: React.FC<Props> = ({
  handleSubmit,
  query,
  setQuery,
  inputRef,
}) => {
  const { todos, toggleAll } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}

      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
