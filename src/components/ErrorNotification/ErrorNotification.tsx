import { FC, memo } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

interface Props {
  hasError: boolean;
  errorMessage: string;
  closeNotification: () => void;
}

export const ErrorNotification: FC<Props> = memo(({
  hasError,
  errorMessage,
  closeNotification,
}) => (
  <CSSTransition
    in={hasError}
    timeout={1000}
    classNames="error"
    unmountOnExit
  >
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !hasError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="HideErrorButton"
        onClick={closeNotification}
      />

      {errorMessage}
    </div>
  </CSSTransition>
));
