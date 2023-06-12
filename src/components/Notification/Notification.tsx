import React from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  setShowError: (error: null | Error) => void;
  ShowError: null | Error;
  isEmptyTitle: boolean;
  isUnableToAdd: boolean;
  isUnableToRemove: boolean;
  isUnableToUdate: boolean;
};

export const Notification: React.FC<Props> = React.memo(({
  setShowError,
  ShowError,
  isEmptyTitle,
  isUnableToAdd,
  isUnableToUdate,
}) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: (!ShowError) },
    )}
    >
      <button
        type="button"
        className="delete hidden"
        id="delete"
        onClick={() => setShowError(null)}
      >
        Delete
      </button>

      {isEmptyTitle && Error.Title}
      {isUnableToAdd && Error.Add}
      {isUnableToAdd && Error.Remove}
      {isUnableToUdate && Error.Update}
    </div>
  );
});
