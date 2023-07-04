import React, { useEffect } from 'react';
import classNames from 'classnames';
import './ErrorMesage.css';

type Props = {
  error: string,
  onError: (value: string) => void,
};

export const ErrorMesage: React.FC<Props> = ({ error, onError }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (error) {
      timer = setTimeout(() => {
        onError('');
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error, onError]);

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
        onClick={() => onError('')}
      >
        х
      </button>
      {error}
    </div>
  );
};
