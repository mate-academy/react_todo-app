import classNames from 'classnames';

type Props = {
  deleteError: (value: string) => void;
  errorMessage: string;
};

export const Notification: React.FC<Props> = ({
  deleteError,
  errorMessage,
}) => {
  const handleDelete = () => {
    deleteError('');
  };

  const handleKeyDowm = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleDelete();
    }
  };

  return (
    <div
      onClick={handleDelete}
      onKeyDown={handleKeyDowm}
      role="button"
      tabIndex={0}
      className={classNames(
        'notification',
        {
          hidden: !errorMessage,
        },
      )}
    >
      {errorMessage}
    </div>
  );
};
