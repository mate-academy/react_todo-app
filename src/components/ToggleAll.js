import React from 'react';

export const ToggleAll = props => {
  const { value, onToggleAllChange } = props;

  const handleCheckboxChange = () => onToggleAllChange();

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={value}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
