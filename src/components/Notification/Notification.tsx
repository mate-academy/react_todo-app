/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  error: Error;
  onDelete: () => void;
};

export const Notification: React.FC<Props> = ({ error, onDelete }) => (
  <div className={classNames(
    'notification is-danger is-light has-text-weight-normal',
    { hidden: !error },
  )}
  >

    <button
      type="button"
      className="delete"
      onClick={onDelete}
    />

    {error}
  </div>
);
