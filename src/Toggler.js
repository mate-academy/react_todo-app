import React from 'react';

export const Toggler = ({ selectAll, allSelected }) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={selectAll}
        checked={allSelected}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
