/* eslint-disable react/self-closing-comp */
import { useEffect } from 'react';

type Props = {
  error: string;
  setError: (error: string) => void;
};

export const ErrorMessage: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, []);

  return (
    <div className="error-message">
      <p className="error-message__text">
        {error}
      </p>
      <button
        type="button"
        className="error-message__close"
        onClick={() => {
          setError('');
        }}
      >
      </button>
    </div>
  );
};
