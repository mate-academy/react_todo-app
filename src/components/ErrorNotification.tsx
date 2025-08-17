import React, { useEffect } from 'react';
import { ErrorMessages } from '../types/ErrorMessages';
import classNames from 'classnames';

type Props = {
  errorMessage: ErrorMessages;
  removeError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  removeError,
}) => {
  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      removeError();
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, removeError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: errorMessage === ErrorMessages.default,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setTimeout(removeError, 0);
        }}
      />
      {errorMessage}
    </div>
  );
};
