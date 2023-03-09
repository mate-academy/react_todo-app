import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ErrorTypes } from '../types/ErrorTypes';

type Props = {
  error: ErrorTypes | null;
  setError: Dispatch<SetStateAction<ErrorTypes | null>>;
};

const Errors = {
  [ErrorTypes.Load]: 'Unable to load todos',
  [ErrorTypes.Add]: 'Unable to add a todo',
  [ErrorTypes.Delete]: 'Unable to delete a todo',
  [ErrorTypes.Update]: 'Unable to update a todo',
  [ErrorTypes.Empty]: 'Title can\'t be empty',
};

export const ErrorNotifications: React.FC<Props> = ({
  error,
  setError,
}) => {
  useEffect(() => {
    const timeoutID = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(timeoutID);
  });

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !error },
    )}
    >
      <button
        type="button"
        aria-label="close notification"
        className="delete"
        onClick={() => setError(null)}
      />

      {error && Errors[error]}
    </div>
  );
};
