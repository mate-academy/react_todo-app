import { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { NotificationContext } from '../../context/NotificationContext';

export const Notification = () => {
  const {
    errorMessage,
    isHiddenNotification,
    setErrorMessage,
    setIsHiddenNotification,
  } = useContext(NotificationContext);
  const hideNotification = () => setIsHiddenNotification(true);

  const handleOnTransitionEnd = () => {
    if (isHiddenNotification) {
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    setIsHiddenNotification(false);

    const timeout = setTimeout(hideNotification, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={classNames(
        'notification', 'is-danger', 'is-light', 'has-text-weight-normal', {
          hidden: isHiddenNotification,
        },
      )}
      onTransitionEnd={handleOnTransitionEnd}
    >
      <button
        type="button"
        className="delete"
        aria-label="delete"
        onClick={hideNotification}
      />
      {errorMessage}
    </div>
  );
};
