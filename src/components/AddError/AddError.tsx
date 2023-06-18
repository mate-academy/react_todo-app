import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  error: string,
};

export const AddError: React.FC<Props> = ({ error }) => {
  const [isCloseError, setIsCloseError] = useState(false);

  return (
    <div className={cn(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !isCloseError },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Close"
        onClick={() => setIsCloseError(true)}
      />

      {error}
    </div>
  );
};
