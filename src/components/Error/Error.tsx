import React, { useEffect, useRef } from 'react';
import './Error.scss';

type Props = {
  getDataError: boolean,
  postDataError: boolean,
  deleteDataError: boolean,
  inputState: boolean,
  disableErrorHandling: () => void,
};

export const Error: React.FC<Props> = ({
  getDataError,
  postDataError,
  deleteDataError,
  inputState,
  disableErrorHandling,
}) => {
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = setTimeout(() => disableErrorHandling(), 3000);

    timerId.current = id;

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  const handleErrorOff = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    disableErrorHandling();
  };

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        aria-label="delete"
        onClick={handleErrorOff}
      />

      {getDataError && 'Error, can\'t get todos from server'}
      {postDataError && 'Unable to add a todo'}
      {deleteDataError && 'Unable to delete a todo'}
      {inputState && 'Title can\'t be empty'}
    </div>
  );
};
