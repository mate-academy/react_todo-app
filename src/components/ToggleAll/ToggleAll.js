import React from 'react';
import { ToggleAllShape } from '../../Shapes';

export const ToggleAll = (props) => {
  const { toggleAll, allSelected } = props;

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={allSelected}
        onClick={event => toggleAll(event)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};

ToggleAll.propTypes = ToggleAllShape.isRequired;
