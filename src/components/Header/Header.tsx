/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  newTodoTitle: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  postNewTodo: (event: React.FormEvent<HTMLFormElement>) => void;
  isTodoAdded: boolean;
  isActiveTodo: boolean;
  toggleAll: () => void;
};

export const Header: React.FC<Props> = ({
  newTodoTitle,
  handleInput,
  postNewTodo,
  isTodoAdded,
  isActiveTodo,
  toggleAll,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isActiveTodo },
        )}
        onClick={toggleAll}
      />

      <form onSubmit={postNewTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleInput}
          disabled={isTodoAdded}
        />
      </form>
    </header>
  );
};
