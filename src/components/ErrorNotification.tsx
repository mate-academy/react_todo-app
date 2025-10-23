import { FC } from 'react';
import cn from 'classnames';

interface Props {
  errorMessage: string;
  showError: boolean;
  setShowError: (shoeError: boolean) => void;
}

export const ErrorNotification: FC<Props> = ({
  errorMessage,
  showError,
  setShowError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !showError,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setShowError(false)}
      />
      {errorMessage}
    </div>
  );
};
