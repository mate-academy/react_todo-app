import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface HeaderProps {
  todos: Todo[];
  addTodo: (title: string) => void;
  query: string;
  setQuery: (query: string) => void;
  toggleAll: boolean;
  setToggleAll: (value: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  todos,
  addTodo,
  query,
  setQuery,
  toggleAll,
  setToggleAll,
}) => {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addTodo(query);
    setQuery('');
  };

  const handleToggleAll = () => {
    setToggleAll(!toggleAll);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all',
          {
            active: todos.some((todo) => !todo.completed),
          })}
        aria-label="Toggle all todos"
        onClick={handleToggleAll}
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
