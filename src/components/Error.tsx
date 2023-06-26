import classNames from 'classnames';
import { useEffect } from 'react';
import { useTodosContext } from '../context';

export const Error = () => {
  const { errorType, setErrorType } = useTodosContext();

  const handleCloseError = () => {
    setErrorType('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorType('');
    },
    3000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorType]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorType },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={handleCloseError}
        aria-label="delete"
      />

      {errorType}
    </div>
  );
};
