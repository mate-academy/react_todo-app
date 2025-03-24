import classNames from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  error: string;
  onError: (title: string) => void;
};

export const ErrorInfo: React.FC<Props> = ({ error, onError }) => {
  useEffect(() => {
    if (error) {
      setTimeout(() => onError(''), 3000);
    }
  }, [error, onError]);

  const handleClose = () => {
    onError('');
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
