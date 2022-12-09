import React from 'react';
import classNames from 'classnames';

type Props = {
  isProcessed: boolean;
};

export const TodoLoader: React.FC<Props> = React.memo(({
  isProcessed,
}) => {
  return (
    <div
      className={classNames(
        'modal',
        'overlay',
        { 'is-active': isProcessed },
      )}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
});
