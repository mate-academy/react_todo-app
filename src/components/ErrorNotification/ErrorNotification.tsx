import classNames from 'classnames';
import React, { useEffect } from 'react';

interface ErrorNotificationProps {
  errorNotification: string;
  setErrorNotification: (arg: string) => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorNotification,
  setErrorNotification,
}) => {
  useEffect(() => {
    if (!errorNotification) {
      return;
    }

    const timeout = setTimeout(() => setErrorNotification(''), 3000);

    return () => clearTimeout(timeout);
  }, [errorNotification, setErrorNotification]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorNotification },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorNotification('')}
      />
      {errorNotification}
    </div>
  );
};
