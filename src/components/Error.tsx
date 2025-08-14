import classNames from 'classnames';

type Props = {
  error: string;
};

export const ErrorComponent: React.FC<Props> = ({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: error.length === 0 },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={e => {
          const parent = (e.target as HTMLButtonElement).parentElement;

          if (parent) {
            parent.classList.add('hidden');
          }
        }}
      />
      {error.length > 0 ? error : ''}
    </div>
  );
};
