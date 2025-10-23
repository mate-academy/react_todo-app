import { FC } from 'react';
import cn from 'classnames';
import { useTodoContext } from '../context/TodoContext';

export const ErrorNotification: FC = () => {
  const { errorMessage, setErrorMessage } = useTodoContext();

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
