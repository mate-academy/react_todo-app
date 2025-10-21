import React from 'react';

type Props = {
  message: string;
  onHide: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ message, onHide }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${message ? '' : 'hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onHide}
      />
      {message}
    </div>
  );
};
