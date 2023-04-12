import React from 'react';
import classNames from 'classnames';

type Props = {
  isLoading: boolean;
};

export const Loader: React.FC<Props> = ({ isLoading }) => (
  <div className={classNames(
    'modal overlay',
    {
      'is-active': isLoading,
    },
  )}
  >
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
);
