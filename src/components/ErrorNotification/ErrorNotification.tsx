import { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage,
  closeError: () => void,
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  closeError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      closeError();
    }, 3000);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="delete"
        onClick={closeError}
      />
      {errorMessage}
    </div>
  );
};
