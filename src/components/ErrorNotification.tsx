import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import { useGlobalDispatch, useGlobalState } from '../hooks/useGlobal';

type NotificationProps = {
  errorId: number;
  errors: string[];
};

export const ErrorNotification: React.FC<NotificationProps> = ({
  errors,
  errorId,
}) => {
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { isError, notificationIsHide } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const errorHide = useCallback(() => {
    dispatch({ type: 'setNotificationIsHide', payload: false });

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      dispatch({ type: 'setNotificationIsHide', payload: true });
    }, 3000);
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      errorHide();
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [errorHide, errorId, isError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: notificationIsHide },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          dispatch({ type: 'setNotificationIsHide', payload: true });
        }}
      />
      {/* show only one message at a time */}
      {errors.map((error, index) => (
        <span key={index}>
          {error}
          <br />
        </span>
      ))}
    </div>
  );
};
