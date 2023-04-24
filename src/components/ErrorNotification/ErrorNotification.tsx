import classNames from 'classnames';

type Props = {
  errorText: string,
  setErrorText: (errorText: string) => void,
};

export const ErrorNotification: React.FC<Props> = (
  { errorText, setErrorText },
) => {
  const handleCloseButton = () => setErrorText('');

  return (
    <>
      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorText },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={handleCloseButton}
          aria-label="Close"
        />
        <span>{errorText}</span>
      </div>
    </>
  );
};
