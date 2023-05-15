import classNames from 'classnames';
import React from 'react';

interface Props {
  error: boolean,
  errorNotice: string,
  closeErrorNotice: (state: string) => void,
}

export const Notification: React.FC<Props> = React.memo(
  ({
    error,
    errorNotice,
    closeErrorNotice,
  }) => {
    return (
      <div
        className={classNames(
          'notification',
          { hidden: !error },
        )}
      >
        <button
          aria-label="btn"
          type="button"
          className="notification__delete"
          onClick={() => closeErrorNotice('')}
        />

        {errorNotice}
      </div>
    );
  },
);
