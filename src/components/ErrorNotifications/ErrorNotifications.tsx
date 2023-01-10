import React, { useContext, useEffect } from 'react';
import { ContextTextError } from '../Context/ContextTextError';
import './ErrorNotifications.scss';

export const ErrorNotifications: React.FC = React.memo(() => {
  const { textError, setTextError } = useContext(ContextTextError);

  useEffect(() => {
    setTimeout(() => setTextError(''), 3000);
  }, []);

  return (
    <div className="error">
      <span className="error__text">
        {`Error:
          ${textError}
        `}
      </span>
      <button
        type="button"
        className="error__close button is-danger is-inverted"
        onClick={() => setTextError('')}
      >
        X
      </button>
    </div>
  );
});
