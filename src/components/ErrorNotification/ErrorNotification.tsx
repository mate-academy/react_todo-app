/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  errorMessage: string;
  hideError: () => void;
}

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  hideError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={hideError}
      />
      {errorMessage}
    </div>
  );
};
