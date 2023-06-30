import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  error: string;
  closeError: () => void;
};

export const Error: React.FC<Props> = React.memo(({
  error,
  closeError,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const timeoutId = setTimeout(() => {
    setIsVisible(false);
    closeError();
  }, 3000);

  const handleClick = () => {
    clearTimeout(timeoutId);
    closeError();
  };

  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isVisible,
      })}
    >
      <button
        aria-label="none"
        type="button"
        className="delete"
        onClick={handleClick}
      />
      {error}
    </div>
  );
});
