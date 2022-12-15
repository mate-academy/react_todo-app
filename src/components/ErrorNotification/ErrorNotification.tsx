import React from 'react';
import classNames from 'classnames';
import { Errors } from '../../types/Errors';

type Props = {
  isError: boolean
  error: Errors;
  setIsError: (error: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  isError,
  error,
  setIsError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal mt-3',
        { hidden: !isError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        aria-label="Error button"
        className="delete"
        onClick={() => setIsError(false)}
      />
      {error}
    </div>
  );
};
