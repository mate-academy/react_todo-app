import React from 'react';
import PropTypes from 'prop-types';

export default function ItemToggleAllCompleted({ todos, onToggleDoneAll }) {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={() => onToggleDoneAll(todos)}
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
    </>
  );
}

ItemToggleAllCompleted.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
  onToggleDoneAll: PropTypes.func.isRequired,
};
