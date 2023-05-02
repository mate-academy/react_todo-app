import { FC } from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  errorType: Error,
  handleError: (err: Error) => void,
};

export const ErrorMessage: FC<Props> = ({ errorType, handleError }) => (
  <div className={classNames(
    'notification',
    'is-danger',
    'is-light',
    'has-text-weight-normal',
    { hidden: errorType === Error.None },
  )}
  >
    <button
      type="button"
      className="delete"
      onClick={() => handleError(Error.None)}
      aria-label="close error"
    />
    {errorType === Error.EmptyInput
      ? "Title can't be empty"
      : `Unable to ${errorType} a todo`}
  </div>
);
