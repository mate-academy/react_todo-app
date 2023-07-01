/* eslint-disable jsx-a11y/control-has-associated-label */
import { FormEvent } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  query: string;
  onChange(value: string): void;
  onSubmit(e: FormEvent<HTMLFormElement>): void;
  activeTodos: Todo[];
  onToggle(): void;
};

export const Header: React.FC<Props> = ({
  query,
  onChange,
  onSubmit,
  activeTodos,
  onToggle,
}) => {
  return (
    <header className="header">
      <h1>todos</h1>

      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: activeTodos.length === 0,
        })}
        onClick={onToggle}
      />

      <form onSubmit={onSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
      </form>
    </header>
  );
};
