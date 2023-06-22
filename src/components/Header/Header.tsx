import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Todo } from 'types/Todo';
import { ErrorMessage } from 'enums/ErrorMessages';

import { USER_ID } from 'api/todos';

type Props = {
  onAdd: (title: string) => void;
  toggleAll: (checked: boolean) => void;
  onTempTodo: (todo: Todo) => void;
  onAddError: (error: ErrorMessage) => void;
  todos: Todo[];
  isInputDisabled: boolean;
};

export const Header: React.FC<Props> = React.memo(({
  todos,
  onAdd,
  toggleAll,
  onTempTodo,
  onAddError,
  isInputDisabled,
}) => {
  const [title, setTitle] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const hasUnCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    setIsChecked(hasUnCompleted);
  }, [hasUnCompleted]);

  const handleChange = () => {
    setTimeout(() => {
      setIsChecked(current => !current);
    }, 300);
  };

  const handleClick = () => {
    toggleAll(isChecked);
  };

  const handleChangeTitle = (e: React.BaseSyntheticEvent) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo = {
      title,
      userId: USER_ID,
      completed: false,
    };

    if (!title.trim()) {
      onAddError(ErrorMessage.TITLE);
      setTitle('');

      return;
    }

    onTempTodo(({
      id: 0,
      ...todo,
    }));
    onAdd(title);
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        aria-label="none"
        id="toggle-all"
        className={classNames('todoapp__toggle-all', {
          active: !hasUnCompleted,
        })}
        data-cy="toggleAll"
        onChange={handleChange}
        onClick={handleClick}
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleChangeTitle}
          disabled={isInputDisabled}
          data-cy="createTodo"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});
