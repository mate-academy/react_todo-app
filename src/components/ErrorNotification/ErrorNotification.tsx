import React, { useEffect } from 'react';
import cn from 'classnames';
import { useTodosContext } from '../controllers/todos/useTodosContext';

export const ErrorNotification: React.FC = () => {
  const { errorMessage, onChangeErrorMessage } = useTodosContext();

  useEffect(() => {
    const timeout = setTimeout(() => onChangeErrorMessage(''), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onChangeErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
