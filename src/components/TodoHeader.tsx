import React from 'react';
import classnames from 'classnames';

interface Props {
  activeTodos: number
  title: string
  isProcessed: boolean
  isAnyTodo: boolean
  onAddTitle: (value: string) => void
  onAddTodo: (event: React.FormEvent<HTMLFormElement>) => void
  onToggleAll: () => void
}

export const TodoHeader: React.FC<Props> = ({
  activeTodos,
  title,
  isAnyTodo,
  isProcessed,
  onAddTitle,
  onAddTodo,
  onToggleAll,
}) => {
  return (
    <header className="todoapp__header">
      {isAnyTodo
        && (
          <button
            type="button"
            className={classnames(
              'todoapp__toggle-all',
              { active: !activeTodos },
            )}
            disabled={isProcessed}
            onClick={onToggleAll}
            aria-label="button-toggle-all"
          />
        )}

      <form onSubmit={onAddTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => onAddTitle(event.target.value)}
          disabled={isProcessed}
        />
      </form>
    </header>
  );
};
