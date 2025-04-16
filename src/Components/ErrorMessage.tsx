import React from 'react';

interface ErrorMessageProps {
  errorMessage: string;
  setErrorMessage: (value: string) => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = React.memo(
  ({ errorMessage, setErrorMessage }) => {
    return (
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage.trim() ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    );
  },
);

ErrorMessage.displayName = 'ErrorMessage';
