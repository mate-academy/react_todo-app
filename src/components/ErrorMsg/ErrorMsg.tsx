import React from 'react';

interface ErrorMsgProps {
  message: string;
  setError: (msg: string) => void;
}
export const ErrorMsg: React.FC<ErrorMsgProps> = ({ message, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`
          notification
          is-danger
          is-light
          has-text-weight-normal
          ${message ? '' : 'hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {message}
    </div>
  );
};
