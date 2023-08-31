import React from 'react';
import classNames from 'classnames';

type Props = {
  text: string,
  isVisible: boolean,
};

export const Error: React.FC<Props> = ({
  text,
  isVisible,
}) => {
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
