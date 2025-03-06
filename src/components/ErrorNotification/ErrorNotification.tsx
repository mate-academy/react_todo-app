import React, { useEffect } from 'react';

import './errorNotification.scss';

import cn from 'classnames';

type Props = {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (errorMessage) {
      timeoutId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [errorMessage, setErrorMessage]);

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
        onClick={() => setErrorMessage('')}
      >
        ×
      </button>
      {errorMessage}
    </div>
  );
};
