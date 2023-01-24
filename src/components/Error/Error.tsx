import React from 'react';
import { TypeError } from '../../types/ErrorType';

interface Props {
  errorType: string | null,
  onRemoveErrorHandler: () => void,
}

export const Erorr: React.FC<Props> = ({
  errorType,
  onRemoveErrorHandler,
}) => {
  const errorHandler = (typeOfError: string | null) => {
    switch (typeOfError) {
      case TypeError.ADD:
        return 'Unable to add a todo';
      case TypeError.DELETE:
        return 'Unable to delete a todo';
      case TypeError.UPDATE:
        return 'Unable to update a todo';
      case TypeError.LOAD:
        return 'Unable to load a todo';
      case TypeError.TITLE:
        return 'Title cant be empty';
      default:
        return 'Erorr';
    }
  };

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        aria-label="Delete"
        className="delete"
        onClick={onRemoveErrorHandler}
      />

      {errorHandler(errorType)}
    </div>
  );
};
