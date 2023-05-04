import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  errorType: ErrorType,
  hasError: boolean,
  onNotificationClose: () => void,
};

export const Error: FC<Props> = ({
  errorType,
  hasError,
  onNotificationClose,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    switch (errorType) {
      case ErrorType.Add:
      case ErrorType.Delete:
      case ErrorType.Update:
      case ErrorType.Load:
        setErrorMessage(`Unable to ${errorType} a todo`);
        break;

      case ErrorType.EmptyTitle:
        setErrorMessage('Title can\'t be empty');
        break;

      default:
        setErrorMessage('');
        break;
    }
  }, [errorType]);

  useEffect(() => {
    const timer = setTimeout(() => onNotificationClose(), 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !hasError,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onNotificationClose}
        aria-label="Close notification about an error"
      />

      {errorMessage}
    </div>
  );
};
