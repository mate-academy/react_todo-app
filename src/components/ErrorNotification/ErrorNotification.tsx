import React from 'react';
import classNames from 'classnames';
import { Errors } from '../../types/Errors';

type Props = {
  error: Errors,
  setError: (error: Errors) => void,
};

export const ErrorNotification: React.FC<Props> = React.memo(
  ({ error, setError }) => {
    const handleDeleteError = () => setError(Errors.NONE);

    setTimeout(() => setError(Errors.NONE), 3000);

    return (
      <div
        data-cy="ErrorNotification"
        className={
          classNames(
            'notification',
            'is-danger',
            'is-light',
            'has-text-weight-normal',
            { hidden: error === Errors.NONE },
          )
        }
      >
        <button
          aria-label="Delete error"
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleDeleteError}
        />

        {error}
      </div>
    );
  },
);
