import React from 'react';

type Props = {
  error: string,
  closeError: (error: string) => void
};

export const ErrorNotification: React.FC<Props> = React.memo(({
  error,
  closeError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
      hidden={!error}
    >
      <button
        aria-label="HideError"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => closeError('')}
      />
      {error}
    </div>
  );
});
