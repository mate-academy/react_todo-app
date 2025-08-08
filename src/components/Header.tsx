import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface HeaderProps {
  title: string;
  newTitle: string;
  setNewTitle: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  todos: Todo[];
  handleToggleAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  newTitle,
  setNewTitle,
  onSubmit,
  loading,
  inputRef,
  todos,
  handleToggleAll,
}) => (
  <header className="todoapp__header">
    {todos.length > 0 && (
      <button
        id="toggle-all"
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        onClick={handleToggleAll}
        aria-label="Toggle all todos"
        aria-pressed={todos.every(todo => todo.completed)}
        data-cy="ToggleAllButton"
      />
    )}

    <form onSubmit={onSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="todoapp__new-todo"
        data-cy="NewTodoField"
        placeholder="What needs to be done?"
        aria-label="Add new todo"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        disabled={loading}
        aria-disabled={loading}
        required
        autoFocus
      />
    </form>
  </header>
);
