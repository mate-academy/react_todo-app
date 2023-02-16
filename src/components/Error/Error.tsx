/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  error: string,
  onClick: () => void,
};

export const Error:React.FC<Props> = ({ error, onClick }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
      hidden={!error.length}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClick}
      />
      { error }
    </div>
  );
};
