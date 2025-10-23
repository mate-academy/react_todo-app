import { FC } from 'react';
import cn from 'classnames';

interface Props {
  isToggleAllVisible: boolean;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  inputDisable: boolean;
  todoTitle: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  allCompleted: boolean;
  handleToggleAll: () => void;
}

export const Header: FC<Props> = ({
  isToggleAllVisible,
  inputRef,
  inputDisable,
  todoTitle,
  handleInputChange,
  handleSubmit,
  allCompleted,
  handleToggleAll,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {isToggleAllVisible && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allCompleted })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form method="POST" onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          name={'title'}
          value={todoTitle}
          onChange={handleInputChange}
          disabled={inputDisable}
          autoFocus
        />
      </form>
    </header>
  );
};
