import React from 'react';
import { ToggleAllShape } from '../../Shapes';

export const ToggleAll = (props) => {
  const { toggleAll } = props;

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};

ToggleAll.propTypes = ToggleAllShape.isRequired;
