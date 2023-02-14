import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Action } from '../enums/Action';
import { ActionType } from '../types/ActionType';

type Props = {
  error: string;
  dispatch: React.Dispatch<ActionType>,
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  dispatch,
}) => {
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setIsShown(false);
      dispatch({ type: Action.ERROR, payload: '' });
    }, 3000);

    return () => {
      clearInterval(timerID);
    };
  }, [error]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isShown },
      )}
    >
      <button
        data-cy="HideErrorButton"
        aria-label="Close"
        type="button"
        className="delete"
        onClick={() => setIsShown(false)}
      />
      {error}
    </div>
  );
};
