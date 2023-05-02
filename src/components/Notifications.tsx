import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ErrorTypes } from '../types/ErrorTypes';

type Props = {
  setError: (error: ErrorTypes | null) => void,
  error: ErrorTypes | null,
};

export const Notifications: React.FC<Props> = ({ setError, error }) => {
  const [isHidden, setIsHidden] = useState(false);

  const deleteError = () => {
    setIsHidden(true);
    setTimeout(() => {
      setError(null);
    });
  };

  useEffect(() => {
    setTimeout(deleteError, 3000);
  });

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: isHidden },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="deleteError"
        onClick={deleteError}
      />
      {error}
    </div>
  );
};
