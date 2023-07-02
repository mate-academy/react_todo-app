import React, { useEffect } from 'react';
import classNames from 'classnames';
import './ErrorMesage.css';

type Props = {
  error: string,
  setError: (value: string) => void,
};

export const ErrorMesage: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (error) {
      timer = setTimeout(() => {
        setError('');
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error, setError]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !error,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setError('')}
      >
        х
      </button>
      {error}
    </div>
  );
};
