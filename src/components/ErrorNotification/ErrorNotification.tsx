import React from 'react';

interface ErrorNotificationProps {
  error: string | null;
  onClose: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
  onClose,
}) => {
  const isHidden = error === null || error === '';

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${isHidden ? 'hidden' : ''}`}
    >
      {error}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onClose()}
      />
    </div>
  );
};
