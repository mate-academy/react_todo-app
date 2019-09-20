import React from 'react';
// import PropTypes from 'prop-types';

const RemoveAllDone = ({ doneTodos, onDeletedAllDone }) => {
  console.log('remove props:', doneTodos.length);
  console.log('onDeletedAllDone:', onDeletedAllDone);

  return (
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
};

// RemoveAllDone.propTypes = {};

export default RemoveAllDone;
