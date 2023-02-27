import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ErrorType } from '../../enums/ErrorType';

type Props = {
  errorType: ErrorType;
  onCloseNotification: () => void;
};

export const ErrorNotification: React.FC<Props> = React.memo(
  ({ errorType, onCloseNotification }) => {
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      switch (errorType) {
        case ErrorType.Add:
        case ErrorType.Delete:
        case ErrorType.Update:
        case ErrorType.Download:
          setErrorMessage(`Unable to ${errorType} a todo`);

          break;

        case ErrorType.GetUser:
        case ErrorType.Register:
          setErrorMessage(`Unable to ${errorType} the user`);

          break;

        case ErrorType.EmptyTitle:
          setErrorMessage("Title can't be empty");

          break;

        default:
          break;
      }
    }, [errorType]);

    useEffect(() => {
      const timerId = setTimeout(() => onCloseNotification(), 3000);

      return () => clearTimeout(timerId);
    });

    return (
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: errorType === ErrorType.None,
          },
        )}
      >
        <button
          type="button"
          className={classNames('delete', {
            hidden: errorType === ErrorType.None,
          })}
          onClick={onCloseNotification}
          aria-label="Close notification about an error"
        />

        {errorMessage}
      </div>
    );
  },
);
