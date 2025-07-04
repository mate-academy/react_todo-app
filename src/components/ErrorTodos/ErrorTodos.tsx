import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { TodoContext } from '../../context/TodoContext';

export const ErrorTodos: React.FC = () => {
  const { error, clearError } = useContext(TodoContext);

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
          onClick={clearError}
        />
        {error}
      </div>
    </>
  );
};
