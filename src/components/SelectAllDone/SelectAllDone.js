import React from 'react';

const SelectAllDone = ({ todos, onToggleDoneAll }) => (
  <>
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label
      htmlFor="toggle-all"
      onClick={() => onToggleDoneAll(todos)}
    >
      Mark all as complete
    </label>
  </>
);

export default SelectAllDone;
