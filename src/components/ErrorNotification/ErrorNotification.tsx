import { FC, memo } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

interface Props {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const ErrorNotification: FC<Props> = memo(({
  errorMessage,
  setErrorMessage,
}) => (
  <CSSTransition
    in={!!errorMessage}
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
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="HideErrorButton"
        onClick={() => setErrorMessage('')}
      />

      {errorMessage}
    </div>
  </CSSTransition>
));
