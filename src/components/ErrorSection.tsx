import classNames from 'classnames';
import { ErrorMessage } from '../types/ErrorMessage';
import { initialErrorMessage } from '../constants/initialErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
  setErrorMessage: (errorMessage: ErrorMessage) => void;
};

export const ErrorSection: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden:
          !errorMessage.load &&
          !errorMessage.delete &&
          !errorMessage.create &&
          !errorMessage.emptyTitle &&
          !errorMessage.updating,
      },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => {
        setErrorMessage(initialErrorMessage);
      }}
    />
    {/* show only one message at a time */}
    {errorMessage.load && 'Unable to load todos'}
    {errorMessage.create && 'Unable to add a todo'}
    {errorMessage.delete && 'Unable to delete a todo'}
    {errorMessage.emptyTitle && 'Title should not be empty'}
    {errorMessage.updating && 'Unable to update a todo'}
  </div>
);
