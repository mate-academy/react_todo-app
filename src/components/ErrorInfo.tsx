import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useTodos } from '../hooks/useTodos';

export const ErrorInfo: React.FC = () => {
  const { error, setError } = useTodos();

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(''), 3000);
    }
  }, [error, setError]);

  const handleClose = () => {
    setError('');
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !error,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClose}
      />
      {/* show only one message at a time */}
      {error}
    </div>
  );
};
