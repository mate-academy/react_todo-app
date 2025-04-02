import cn from 'classnames';
import { ErrorEnum } from '../../types/ErrorEnum';
import { useEffect } from 'react';

type Props = {
  errorMessage: ErrorEnum | null;
  onClose: () => void;
};

export const Error: React.FC<Props> = ({ errorMessage, onClose }) => {
  useEffect(() => {
    setTimeout(onClose, 3000);
  }, [errorMessage, onClose]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {errorMessage}
    </div>
  );
};
