/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';
import { Error } from '../../types/Error';

type Props = {
  setError: (error: Error) => void,
  errorText: string,
};

export const TodoNotification: React.FC<Props> = ({ setError, errorText }) => {
  const [isVisible, setIsVisible] = useState(true);

  const deleteNotifacation = () => {
    setIsVisible(false);
    setTimeout(() => {
      setError({
        state: false,
        type: ErrorType.None,
      });
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      deleteNotifacation();
    }, 3000);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !isVisible },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={deleteNotifacation}
      />
      {errorText}
    </div>
  );
};
