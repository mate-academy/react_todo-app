import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  errorMessage: ErrorType;
  onCloseError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onCloseError,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseError();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onCloseError]);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onCloseError}
      >
        ×
      </button>

      {errorMessage}
    </div>
  );
};
