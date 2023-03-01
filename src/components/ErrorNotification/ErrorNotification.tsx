import { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';
import { AppContext } from '../AppContext/AppContext';

export const ErrorNotification = () => {
  const todosData = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      todosData?.setIsError(null);
    }, 3000);
  }, []);

  const getErrorNotification = useMemo(() => {
    switch (todosData?.isError) {
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
  }, [todosData?.isError]);

  const onErrorClose = () => {
    todosData?.setIsError(null);
  };

  return (
    <div
      data-cy="errorNotification"
      className={classNames(
        ('errorNotification'),
        { hidden: !todosData?.isError },
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
