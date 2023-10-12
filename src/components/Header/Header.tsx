import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Errors } from '../../types/Errors';
import { NotificationContext } from '../../context/NotificationContext';
import { LoadingContext } from '../../context/LoadingContext';

type Props = {
  activeTodosCount: number,
  handleToggleCompleted: () => void,
  addNewTodo: (title: string) => void,
};

export const Header: React.FC<Props> = ({
  activeTodosCount,
  handleToggleCompleted,
  addNewTodo,
}) => {
  const [query, setQuery] = useState('');
  const { inputRef } = useContext(LoadingContext);
  const {
    setErrorMessage,
    setIsHiddenNotification,
  } = useContext(NotificationContext);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsHiddenNotification(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const preparedQuery = query.trim();

    if (!preparedQuery) {
      setErrorMessage(Errors.Validation);

      return;
    }

    addNewTodo(preparedQuery);
    setQuery('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all', {
            active: !activeTodosCount,
          },
        )}
        onClick={handleToggleCompleted}
        aria-label="toggle-all"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          ref={inputRef}
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
};
