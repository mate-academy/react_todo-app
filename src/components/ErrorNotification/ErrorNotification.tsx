import React from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  error: Error;
  onError: (error: Error | null) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  onError,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !error },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      aria-label="HideError"
      onClick={() => onError(null)}
    />

    {error}
  </div>
);
