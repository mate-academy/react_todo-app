import React from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
type Props = {
  todos: Todo[];
  allTodoCompleted: boolean;
  handleSubmit: (event: React.FormEvent) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  // onAdd: (title: string) => Promise<void>;
  isInputDisabled: boolean;
  isTodoLoading: boolean;
  // toggleAllTodos: () => void;
  handleCheckboxChangeAll: () => void;
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const Header: React.FC<Props> = props => {
  const {
    allTodoCompleted,
    todos,
    handleSubmit,
    handleCheckboxChangeAll,
    inputValue,
    inputRef,
    handleChange,
    handleKeyPress,
  } = props;

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          id="toggle-all"
          className={cn('todoapp__toggle-all', {
            active: allTodoCompleted,
          })}
          data-cy="ToggleAllButton"
          disabled={todos.length === 0}
          onClick={handleCheckboxChangeAll}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </form>
    </header>
  );
};
