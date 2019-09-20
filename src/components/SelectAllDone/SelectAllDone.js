import React from 'react';
// import PropTypes from 'prop-types';

const SelectAllDone = ({ todos, onToggleDoneall }) => (
  <>
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label
      htmlFor="toggle-all"
      onClick={() => onToggleDoneall(todos)}
    >
      Mark all as complete
    </label>
  </>
);

// SelectAllDone.propTypes = {};

export default SelectAllDone;
