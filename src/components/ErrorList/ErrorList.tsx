import React, { useEffect } from 'react';

interface Props {
  errors: string[];
  onClear: () => void;
}

export const ErrorList: React.FC<Props> = ({ errors, onClear }) => {
  useEffect(() => {
    if (errors.length > 0) {
      setTimeout(onClear, 3000);
    }
  }, [errors, onClear]);

  return (
    <>
      {!!errors.length
        && errors.map((error) => {
          return (
            <div
              className="notification is-danger is-light has-text-weight-normal"
              key={error}
            >
              <button
                type="button"
                className="delete"
                aria-label="close"
                hidden={false}
                onClick={onClear}
              />
              {error}
            </div>
          );
        })}
    </>
  );
};
