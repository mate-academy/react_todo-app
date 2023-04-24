import React, { useEffect } from 'react';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  errorMessage: ErrorType;
  onCloseError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onCloseError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onCloseError();
    }, 3000);
  }, []);

  return (
    <div className="notification">
      <button
        type="button"
        className="delete"
        onClick={onCloseError}
      >
        ×
      </button>
      {errorMessage}
    </div>
  );
};
