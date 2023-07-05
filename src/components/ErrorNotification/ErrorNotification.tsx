import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  errorType: ErrorType;
  onCloseError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorType,
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
        { hidden: !errorType },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onCloseError}
      >
        ×
      </button>

      {errorType}
    </div>
  );
};
