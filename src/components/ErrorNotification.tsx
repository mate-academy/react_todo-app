import cn from 'classnames';
import { ErrorType } from '../types/Error';
import React from 'react';

interface Props {
  error: ErrorType | null;
  setError: (error: ErrorType | null) => void;
}

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {error}
    </div>
  );
};
