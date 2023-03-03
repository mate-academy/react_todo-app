/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';

interface Props {
  errorMessage: string;
  setErrorMessage: (value: string) => void,
}
export const ErrorNotification: FC<Props> = ({
  errorMessage, setErrorMessage,
}) => {
  return (
    <>
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </>
  );
};
