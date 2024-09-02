import classNames from 'classnames';
import ErrorContext from '../../contexts/Errors/ErrorsContext';

export const ErrorNotification = () => {
  const { error } = ErrorContext.useState();
  const { clearError } = ErrorContext.useContract();

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        onClick={clearError}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {error}
    </div>
  );
};
