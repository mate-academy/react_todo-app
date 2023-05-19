import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/Error';

type Props = {
  error: ErrorType;
  setError: React.Dispatch<React.SetStateAction<ErrorType>>
};

export const ErrorMessage: FC<Props> = React.memo(({ error, setError }) => {
  const handleErrorMessageHidden = () => {
    setError(ErrorType.NONE);
  };

  useEffect(
    () => {
      if (error === ErrorType.NONE || error === ErrorType.USER) {
        return;
      }

      const timerId = setTimeout(() => setError(ErrorType.NONE), 3000);

      // eslint-disable-next-line consistent-return
      return () => {
        clearTimeout(timerId);
      };
    }, [error],
  );

  return (
    <div
      className={
        classNames(
          'notification is-danger is-light has-text-weight-normal', {
            hidden: error === ErrorType.NONE,
          },
        )
      }
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={handleErrorMessageHidden}
      />
      {error}
    </div>
  );
});
