import { MouseEventHandler } from 'react';
import { ErrorTodo } from '../../types/ErrorTodo';

type Props = {
  typeError: ErrorTodo | null,
  onCloseErrorMessage: MouseEventHandler<HTMLButtonElement>,
};

export const ErrorMessage: React.FC<Props> = ({
  typeError,
  onCloseErrorMessage,
}) => (
  <div
    style={
      typeError
        ? { opacity: 1 }
        : { opacity: 0 }
    }
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
  >
    <button
      style={
        typeError
          ? { cursor: 'pointer' }
          : { cursor: 'auto' }
      }
      aria-label="HideErrorButton"
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onCloseErrorMessage}
    />
    { typeError }
  </div>
);
