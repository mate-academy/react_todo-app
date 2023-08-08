import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  text: string,
  setIsError(condition: boolean): void,
};

export const Error: React.FC<Props> = ({
  text,
  setIsError,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(() => {
    setIsVisible(false);
  }, 3000);

  if (!isVisible) {
    setTimeout(() => {
      setIsError(false);
    }, 700);
  }

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      {
        hidden: isVisible === false,
      },
    )}
    >
      {text}
    </div>
  );
};
