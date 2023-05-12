import classNames from 'classnames';

interface Props {
  onClose: (value: string | null) => void,
  error: string | null,
}

export const Notification: React.FC<Props> = ({ onClose, error }) => {
  const onClick = () => onClose(null);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !error,
        },
      )}
    >
      <button
        type="button"
        aria-label={error ?? ''}
        className="delete"
        onClick={onClick}
      />

      {error}
    </div>
  );
};
