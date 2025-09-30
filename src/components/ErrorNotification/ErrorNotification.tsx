import React from 'react';
import classNames from 'classnames';

type Props = {
  message: string | null;
  show: boolean;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  message,
  show,
  onClose,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !show },
    )}
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
