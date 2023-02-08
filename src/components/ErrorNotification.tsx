/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  errorText: string,
};

export const ErrorNotification: React.FC<Props> = ({ errorText }) => (
  <div
    className={classNames(
      'notification',
      { 'notification-hidden': !errorText },
    )}
  >
    {errorText}
  </div>
);
