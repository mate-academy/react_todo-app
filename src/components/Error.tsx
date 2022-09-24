type Props = {
  errorMessage: string,
  removeError: () => void,
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const Error:React.FC<Props> = ({ errorMessage, removeError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          removeError();
        }}
      />
      {errorMessage}
    </div>
  );
};
