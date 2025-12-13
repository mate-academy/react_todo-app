import classNames from 'classnames';
import React from 'react';
import { useTodoUI } from '../hooks/useTodoUI';

export const ErrorNotification: React.FC = () => {
  const { errorMessage, clearErrorMessage } = useTodoUI();

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        errorMessage ? '' : 'hidden',
      )}
    >
      <button
        onClick={clearErrorMessage}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorMessage?.message}
    </div>
  );
};
