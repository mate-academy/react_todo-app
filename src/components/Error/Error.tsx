/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  setErrorType: React.Dispatch<React.SetStateAction<string | null>>
  errorMessage: string | null,
};

export const Error: React.FC<Props> = ({
  setErrorType,
  errorMessage,
}) => (
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
          onClick={() => setErrorType(null)}
        />

        {errorMessage}
      </div>
    )}
  </>
);
