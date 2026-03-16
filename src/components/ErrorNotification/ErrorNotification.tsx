import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/TodoContext';

export const ErrorNotification: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(TodoContext);

  return (
    errorMessage && (
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>
    )
  );
};
