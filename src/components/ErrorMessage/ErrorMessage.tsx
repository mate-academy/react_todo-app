/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FC, useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';

export const ErrorMessage: FC = () => {
  const { errorType, clearError } = useContext(ErrorContext);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        ' is-danger',
        ' is-light',
        ' has-text-weight-normal',
        { hidden: !errorType },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={clearError}
      />

      {`${errorType}`}
    </div>
  );
};
