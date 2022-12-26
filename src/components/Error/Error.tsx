import React from 'react';

type Props = {
  error: string,
  setErrorMessage: (error: string) => void,
};

export const Error: React.FC<Props> = ({ error, setErrorMessage }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        aria-label="text"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {error}
    </div>
  );
};
