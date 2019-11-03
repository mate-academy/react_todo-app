import React from 'react';

const RemoveAllDone = ({ doneTodos, onDeletedAllDone }) => (
  <>
    {doneTodos.length > 0 && (
      <button
        onClick={() => onDeletedAllDone(doneTodos)}
        name="Clear completed"
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
      >
        Clear completed
      </button>
    )}
  </>
);

export default RemoveAllDone;
