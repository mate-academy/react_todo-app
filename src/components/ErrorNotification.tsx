import React from 'react';
import { ErrorMessage } from '../types/ErrorMessage';

interface Props {
  message: ErrorMessage | null;
  onClose: () => void;
}

export const ErrorNotification: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div
      role="alert"
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${message ? '' : 'hidden'}`}
    >
      <button
        className="delete"
        onClick={onClose}
        aria-label="Close error notification"
        data-cy="HideErrorButton"
      />
      {message}
    </div>
  );
};
