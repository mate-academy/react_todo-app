/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { clearError } from '../../app/features/error';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';

export const Error: React.FC = () => {
  const { errorMessage } = useAppSelector(state => state.error);
  const dispatch = useAppDispatch();

  return (
    <>
      {errorMessage && (
        <div className={classNames(
          'notification', 'is-danger', 'is-light', 'has-text-weight-normal', {
            hidden: !errorMessage,
          },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => dispatch(clearError())}
          />

          {errorMessage}
        </div>
      )}
    </>
  );
};
