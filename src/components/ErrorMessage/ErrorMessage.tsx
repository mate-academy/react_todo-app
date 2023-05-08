import { FC } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  errorType: ErrorType,
  handleError: (err: ErrorType) => void,
};

export const ErrorMessage: FC<Props> = ({ errorType, handleError }) => (
  <div className={classNames(
    'notification',
    'is-danger',
    'is-light',
    'has-text-weight-normal',
    { hidden: errorType === ErrorType.None },
  )}
  >
    <button
      type="button"
      className="delete"
      onClick={() => handleError(ErrorType.None)}
      aria-label="close error"
    />
    {errorType === ErrorType.EmptyInput
      ? "Title can't be empty"
      : `Unable to ${errorType} a todo`}
  </div>
);
