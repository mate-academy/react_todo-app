import { useEffect } from 'react';

type Props = {
  errorMessage: string;
  onClose: () => void;
};
export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onClose,
}) => {
  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, onClose]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal${!errorMessage ? ' hidden' : ''}`}
    >
      {errorMessage && (
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={onClose}
        />
      )}
      {/* show only one message at a time */}
      {errorMessage}
      <br />
    </div>
  );
};
