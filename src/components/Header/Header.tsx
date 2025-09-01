import React from 'react';
import cn from 'classnames';

interface Props {
  title: string;
  setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  hasTodos: boolean;
  isAllCompleted: boolean;
  onToggleAll: () => void;
}

export const Header = React.memo(
  React.forwardRef<HTMLInputElement, Props>(
    (
      { title, setTitle, onSubmit, hasTodos, isAllCompleted, onToggleAll },
      ref,
    ) => {
      return (
        <header className="todoapp__header">
          {hasTodos && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', { active: isAllCompleted })}
              data-cy="ToggleAllButton"
              onClick={onToggleAll}
            />
          )}

          <form onSubmit={onSubmit}>
            <input
              ref={ref}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={setTitle}
            />
          </form>
        </header>
      );
    },
  ),
);

Header.displayName = 'Header';
