import {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  isError: Error | null,
  setIsError: (arg: Error | null) => void,
};

export const ErrorNotification: React.FC<Props> = ({
  isError,
  setIsError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setIsError(null);
    }, 3000);
  }, []);

  const getErrorNotification = useMemo(() => {
    switch (isError) {
      case Error.Add:
        return 'Unable to add a todo';
      case Error.Delete:
        return 'Unable to delete a todo';
      case Error.Update:
        return 'Unable to update a todo';
      case Error.Empty:
        return 'Title can\'t be empty';
      default:
        return null;
    }
  }, [isError]);

  const onErrorClose = useCallback(() => {
    setIsError(null);
  }, []);

  return (
    <div
      data-cy="errorNotification"
      className={classNames(
        ('errorNotification'),
        { hidden: isError },
      )}
    >
      {getErrorNotification}
      <button
        aria-label="destroyButton"
        data-cy="deleteTodo"
        type="button"
        className="destroyButton"
        onClick={onErrorClose}
      />
    </div>
  );
};
