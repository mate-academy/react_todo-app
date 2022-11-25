import { MouseEventHandler } from 'react';
import { ErrorTodo } from '../../types/ErrorTodo';

type Props = {
  typeError: ErrorTodo | null,
  onCloseErrorMessage: MouseEventHandler<HTMLButtonElement>,
};

enum TextOfError {
  Add = 'Unable to add todos',
  Delete = 'Unable to delete a todo',
  Download = 'Unable to download todos',
  Update = 'Unable to update a todo',
  EmptyTitle = 'Title can\'t be empty',
}

export const ErrorMessage: React.FC<Props> = ({
  typeError,
  onCloseErrorMessage,
}) => {
  const styleError = {
    opacity: 0,
  };

  const styleButton = {
    cursor: 'auto',
  };

  if (typeError) {
    styleButton.cursor = 'pointer';
    styleError.opacity = 1;
  }

  const getTextOfErrorMessage = () => {
    switch (typeError) {
      case ErrorTodo.Add:
        return TextOfError.Add;

      case ErrorTodo.Delete:
        return TextOfError.Delete;

      case ErrorTodo.Download:
        return TextOfError.Download;

      case ErrorTodo.Update:
        return TextOfError.Update;

      case ErrorTodo.EmptyTitle:
        return TextOfError.EmptyTitle;

      default:
        return undefined;
    }
  };

  return (
    <div
      style={styleError}
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        style={styleButton}
        aria-label="HideErrorButton"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onCloseErrorMessage}
      />
      {typeError && getTextOfErrorMessage()}
    </div>
  );
};
