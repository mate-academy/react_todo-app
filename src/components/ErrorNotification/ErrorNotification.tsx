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
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="delete"
          onClick={handleCloseButton}
        />
        <span>{errorText}</span>
      </div>
    </>
  );
};
