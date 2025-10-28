import classNames from 'classnames';
import { useEffect } from 'react';

type ErrorTodosProps = {
  error: string;
  clearError: () => void;
};

export const ErrorTodos: React.FC<ErrorTodosProps> = ({
  error,
  clearError,
}) => {
  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      clearError();
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, clearError]);

  return (
    <>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            clearError();
          }}
        />
        {error}
      </div>
    </>
  );
};
