import React from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  error: Error;
  onDelete: () => void;
};

export const Notification: React.FC<Props> = ({ error, onDelete }) => (
  <div className={classNames(
    'notification is-danger is-light has-text-weight-light',
    { hidden: !error },
  )}
  >
    <button
      type="button"
      className="delete"
      onClick={onDelete}
      aria-label="close button"
    />

    {error}
  </div>
);
