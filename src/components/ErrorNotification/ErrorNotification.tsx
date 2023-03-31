import {
  memo, useEffect, useMemo, useState,
} from 'react';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  error: ErrorType,
  setError: (value: ErrorType) => void,
};

export const ErrorNotification: React.FC<Props> = memo(
  ({ error, setError }) => {
    const [errorMesage, setErrorMesage] = useState('');

    useEffect(() => {
      const timer = setTimeout(() => {
        setError(ErrorType.None);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }, [error]);

    useMemo(() => {
      switch (error) {
        case ErrorType.LoadError:
          setErrorMesage(ErrorType.LoadError);
          break;
        case ErrorType.UploadError:
          setErrorMesage('Unable to add a todo');
          break;
        case ErrorType.RemoveError:
          setErrorMesage(ErrorType.RemoveError);
          break;
        case ErrorType.UpdatedError:
          setErrorMesage(ErrorType.UpdatedError);
          break;
        case ErrorType.EmptyTitle:
          setErrorMesage(ErrorType.EmptyTitle);
          break;

        default:
          setErrorMesage('');
      }
    }, [error]);

    return (
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          aria-label="Delete"
          onClick={() => setError(ErrorType.None)}
        />
        {errorMesage}
      </div>
    );
  },
);
