import React, { useCallback } from 'react';
import classNames from 'classnames';

type Props = {
  onCloseButton: () => void,
  errorMessage: string,
  hasError: boolean,
};

export const TodoNotification: React.FC<Props> = React.memo(({
  onCloseButton,
  errorMessage,
  hasError,
}) => {
  const handleClose = useCallback(() => {
    onCloseButton();
  }, [onCloseButton]);

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !hasError },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={handleClose}
        aria-label="Close notification"
      />

      <span>{errorMessage}</span>
    </div>
  );
});
