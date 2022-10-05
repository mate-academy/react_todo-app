import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  notification: string,
  setNotification: React.Dispatch<React.SetStateAction<string>>,
};

export const Notification: React.FC<Props> = ({
  notification,
  setNotification,
}) => {
  const [isClickedHide, setIsClickedHide] = useState(false);

  setTimeout(() => {
    setNotification('');
  }, 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { 'is-hidden': isClickedHide || !notification.length },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsClickedHide(true)}
      />
      {notification}
    </div>
  );
};
