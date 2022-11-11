import classNames from 'classnames';

type Props = {
  errorText: string;
  closeNotification: () => void;
};

export const Error: React.FC<Props> = ({ errorText, closeNotification }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: errorText.length === 0,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="HideErrorButton"
        onClick={() => closeNotification()}
      />

      {errorText === 'empty'
        ? ('Title can\'t be empty')
        : (`Unable to ${errorText} a todo`)}
    </div>
  );
};
