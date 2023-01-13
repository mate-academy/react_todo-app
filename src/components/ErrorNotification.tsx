import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { ErrorContext } from '../context/ErrorContext';

export const ErrorNotification = () => {
  const {
    isEmptyTitleErrorShown,
    setIsEmptyTitleErrorShown,
  } = useContext(ErrorContext);

  const [isClosePressed, setIsClosePressed] = useState(false);

  const hideErrorHandler = () => {
    setIsClosePressed(true);
    setIsEmptyTitleErrorShown(false);
    setIsClosePressed(false);
  };

  const isErrorShown = !isClosePressed && isEmptyTitleErrorShown;

  useEffect(() => {
    const setErrors = () => {
      setIsEmptyTitleErrorShown(false);
      setIsClosePressed(false);
    };

    const timer = setTimeout(setErrors, 3000);

    return () => clearTimeout(timer);
  }, [
    isEmptyTitleErrorShown,
  ]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !isErrorShown },
      )}
    >
      <button
        aria-label="delete"
        type="button"
        data-cy="HideErrorButton"
        className="delete"
        onClick={hideErrorHandler}
      />
      {!isClosePressed && isEmptyTitleErrorShown && 'Title can`t be empty'}
      <br />
    </div>
  );
};
