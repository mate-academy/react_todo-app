import React, { useContext } from 'react';
import classNames from 'classnames';
import { Errors } from '../../types/Errors';
import { ErrorContext } from './ErrorContext';

export const ErrorNotification = React.memo(
  () => {
    const { error, setError } = useContext(ErrorContext);

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
          onClick={() => setError(Errors.NONE)}
        />

        {error}
      </div>
    );
  },
);
