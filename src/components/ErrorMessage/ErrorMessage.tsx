import React from 'react';
import { Error } from '../../enums/Error';
import { Errors } from '../../utils/Errors';
import { Props } from './Props';

export const ErrorMessage: React.FC<Props> = React.memo(({
  setCurrentError,
  currentError,
}) => {
  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        type="button"
        aria-label="reset Error"
        className="delete"
        onClick={() => setCurrentError(Error.RESET)}
      />
      {Errors[currentError]}
    </div>
  );
});
