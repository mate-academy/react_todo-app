import React from 'react';
import classNames from 'classnames';

type Props = {
  isTodoLoading: boolean,
};

export const ModalOverlay: React.FC<Props> = ({
  isTodoLoading,
}) => {
  return (
    <div className={classNames(
      'modal', 'overlay', {
        'is-active':
      isTodoLoading,
      },
    )}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
