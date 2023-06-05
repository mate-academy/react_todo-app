import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  hasError: ErrorType,
  setHasError: React.Dispatch<React.SetStateAction<ErrorType>>,
};

export const Notification: React.FC<Props> = React.memo(({
  hasError,
  setHasError,
}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      setHasError(ErrorType.None);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, [hasError]);

  const handleClick = () => setHasError(ErrorType.None);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: hasError === ErrorType.None,
        },
      )}
    >
      <button
        type="button"
        aria-label="delete"
        className="delete"
        onClick={handleClick}
      />
      {hasError}
    </div>
  );
});
