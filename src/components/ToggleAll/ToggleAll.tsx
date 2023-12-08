import React from 'react';

import './ToggleAll.scss';

const ToggleAll: React.FC = () => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};

export default ToggleAll;
