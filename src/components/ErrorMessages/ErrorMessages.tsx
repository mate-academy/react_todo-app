import React from 'react';
import { ErrorTypes } from '../../types/ErrorTypes';

type Props = {
  errorMessage: ErrorTypes,
  onDeleteError: () => void;
};

export const ErrorMessages: React.FC<Props> = (
  { errorMessage, onDeleteError },
) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        aria-label="button"
        className="delete"
        onClick={() => onDeleteError()}
      />

      {errorMessage}
      <br />
    </div>
  );
};
