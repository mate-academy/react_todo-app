import classNames from 'classnames';
import { useState } from 'react';
import { ErrorTypes } from '../../types/ErrorTypes';

type Props = {
  error: ErrorTypes | null,
};

export const Notification: React.FC<Props> = ({ error }) => {
  const [onButtonDelete, setOnButtonDelete] = useState(true);

  const onHiddenError = () => {
    setOnButtonDelete(false);
  };

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !onButtonDelete },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Mute volume"
        onClick={onHiddenError}
      />

      {error}
    </div>
  );
};
