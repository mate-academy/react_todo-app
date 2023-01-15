import React from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';
import { errorMessage } from '../../utils/fetchClient';

type Props = {
  error: ErrorType,
  setError: (value: ErrorType) => void,
};

export const ErrorMessage: React.FC<Props> = ({
  error,
  setError,
}) => (
  <div
    className={classNames(
      'notification',
      { hidden: !error },
    )}
  >
    <button
      aria-label="Close Error"
      type="button"
      className="notification__delete"
      onClick={() => setError(ErrorType.Clear)}
    />
    {errorMessage(error)}
  </div>
);
