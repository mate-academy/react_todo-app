/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import cn from 'classnames';
import { Error } from '../types/Error';

interface Props {
  error: Error;
  onErrorChange: (error: Error) => void,
}

export const Notification: React.FC<Props> = ({ error, onErrorChange }) => {
  useEffect(() => {
    if (error) {
      setTimeout(() => onErrorChange(Error.NONE), 3000);
    }
  }, [error]);

  return (
    <div className={cn('notification',
      'is-danger is-light has-text-weight-normal', {
        hidden: error === Error.NONE,
      })}
    >
      <button
        type="button"
        className="delete"
        onClick={() => onErrorChange(Error.NONE)}
      />
      {error}
    </div>
  );
};
