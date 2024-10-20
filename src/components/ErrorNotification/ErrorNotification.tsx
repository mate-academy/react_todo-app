import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useTodoContext } from '../context/TodoContext';

export const ErrorNotification: React.FC = () => {
  const { state, dispatch } = useTodoContext();
  const { errorText } = state;

  useEffect(() => {
    if (errorText) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 3000);

      return () => clearTimeout(timer);
    }

    return () => {};
  }, [errorText, dispatch]);

  if (!errorText) {
    return null;
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: errorText },
      )}
    >
      <button
        onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorText}
    </div>
  );
};
