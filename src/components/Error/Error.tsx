import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  onErrorDisable: () => void,
  errorType: ErrorType,
};

export const Error: React.FC<Props> = ({
  onErrorDisable,
  errorType,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: errorType === ErrorType.success },
      )}
    >
      <button
        aria-label="hide_error"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onErrorDisable()}
      />
      {errorType}
    </div>
  );
};
