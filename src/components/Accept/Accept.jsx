import React from 'react';

export const Accept = ({
  setIsAcceptVisible,
  changeAllTodosStatus
}) => {

  return (
    <div
     className="accept-container"
    >

      <div
        className="accept"
      >

        <p
          className="accept__text"
        >
          Mark all as:
        </p>

        <div
          className="accept__buttons"
        >
          <button
            className="accept__button"
            onClick={() => {
              changeAllTodosStatus(true);
              setIsAcceptVisible(false);
            }}
          >
            completed
          </button>

          <button
            className="accept__button"
            onClick={() => {
              changeAllTodosStatus(false);
              setIsAcceptVisible(false);
            }}
          >
            active
          </button>

          <button
            className="accept__button accept__button-canсel"
            onClick={() => setIsAcceptVisible(false)}
          >
            canсel
          </button>
        </div>
      </div>

    </div>
  );
}
