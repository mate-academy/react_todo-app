import React from 'react';
import classNames from 'classnames';
import { useErrorContext } from '../../contexts/ErrorContext';

export const ErrorNotifications: React.FC = () => {
  const { errorMessage, isHiddenErrorMessage } = useErrorContext();

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isHiddenErrorMessage },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {errorMessage}
    </div>
  );
};
