import React from 'react';
import classNames from 'classnames';

type Props = {
  notification: string;
  onSetNotification: React.Dispatch<React.SetStateAction<string>>;
};

export const Notification: React.FC<Props> = React.memo(({
  notification,
  onSetNotification,
}) => {
  const notificationDelay = setTimeout(() => onSetNotification(''), 3000);

  const clickHandler = () => {
    onSetNotification('');
    clearTimeout(notificationDelay);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        { hidden: !notification },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="hide-notification"
        onClick={clickHandler}
      />
      {notification}
    </div>
  );
});
