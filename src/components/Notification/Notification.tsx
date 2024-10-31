import React, { useContext, useMemo } from 'react';
import classNames from 'classNames';
import { DispatchContext, StateContext } from '../../Store';

export const Notification: React.FC = () => {
  const { errorMessage } = useContext(StateContext);
  const hasError = useMemo(() => !Boolean(errorMessage), [errorMessage]);
  const dispatch = useContext(DispatchContext);
  const onCloseNotification = () => {
    dispatch({ type: 'closeNotification' });
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: hasError,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onCloseNotification}
      />
      {errorMessage}
    </div>
  );
};
