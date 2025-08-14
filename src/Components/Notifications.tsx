import classNames from 'classnames';
import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';

export const Notifications: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext must be used within a TodoProvider');
  }

  const { errorMessage, setErrorMessage } = context;

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
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
