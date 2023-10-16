import React from 'react';
import classNames from 'classnames';
import { Errors } from '../../types/ErrorMessages';

type ErrorMessageProps = {
  errorMessage: Errors,
  isError: boolean,
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessage,
  isError,
}) => {
  return (
    <div
      className={classNames('error-message', {
        hidden: !isError,
      })}
    >
      {errorMessage}
    </div>
  );
};
