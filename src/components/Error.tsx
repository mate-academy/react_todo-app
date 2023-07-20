import React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../enums/error';

type Props = {
  errorMessage: ErrorMessage,
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage>>
};

export const Error: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => (
  <div
    className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-test-weight-normal',
      { hidden: !errorMessage },
    )}
  >
    <button
      type="button"
      className="delete"
      onClick={() => setErrorMessage(ErrorMessage.NONE)}
    >
      x
    </button>

    {errorMessage && (
      <p>
        {errorMessage === ErrorMessage.EMPTY
          ? "Title can't be empty"
          : `${errorMessage}`}
      </p>
    )}
  </div>
);
