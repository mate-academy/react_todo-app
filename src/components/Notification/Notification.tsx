/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Errors } from '../../types/Errors';

type Props = {
  typeOfError: Errors;
  removeNotification: () => void;
};

export const Notification: React.FC<Props> = ({
  typeOfError,
  removeNotification,
}) => {
  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: typeOfError === Errors.None },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={removeNotification}
      />

      { typeOfError !== Errors.None
        ? typeOfError[0].toUpperCase() + typeOfError.slice(1).toLowerCase()
        : ''}
    </div>
  );
};
