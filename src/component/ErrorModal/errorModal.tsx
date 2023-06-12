import React, { useEffect } from 'react';

interface Props {
  onClose: () => void;
  error: string;
  setError: (error: string) => void;
}

export const ErrorModal: React.FC<Props> = ({ onClose, error, setError }) => {
  useEffect(() => {
    const hideNotification = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(hideNotification);
  }, [error]);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="delete"
        onClick={onClose}
      />

      {error}
    </div>
  );
};
