import React from 'react';
import cn from 'classnames';

type Props = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  message,
  isVisible,
  onClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isVisible,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {message}
    </div>
  );
};
