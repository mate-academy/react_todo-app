import classNames from 'classnames';
import React from 'react';

type Props = {
  query: string;
  handleChange: (event: React.ChangeEvent<EventTarget>) => void;
  onSumbit: (event: React.FormEvent<HTMLFormElement>) => void;
  IsDisabled: boolean;
  toggleAll: () => void;
  isTodoStatus: boolean;
};

export const Header: React.FC<Props> = React.memo(({
  query,
  handleChange,
  onSumbit,
  IsDisabled,
  toggleAll,
  isTodoStatus,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all',
          { active: !isTodoStatus })}
        aria-label="toggle-all"
        onClick={toggleAll}
      />

      <form
        onSubmit={onSumbit}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleChange}
          disabled={IsDisabled}
        />
      </form>
    </header>
  );
});
