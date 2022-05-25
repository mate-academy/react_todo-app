import React from 'react';

const ToggleAll: React.FC<ToggleAllProps> = ({
  toggleAllStatus,
  handleToggleAllClick,
}) => (
  <>
    <input
      type="checkbox"
      data-cy="toggleAll"
      id="toggle-all"
      className="toggle-all"
      checked={toggleAllStatus}
      onClick={handleToggleAllClick}
    />
    <label
      htmlFor="toggle-all"
    >
      Mark all as complete
    </label>
  </>
);

export default ToggleAll;
