type Prop = {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
};

export const ErrorNotification = ({ errorMessage, setErrorMessage }: Prop) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${
        !errorMessage ? 'hidden' : ''
      }`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
