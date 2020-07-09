import React from 'react';

import { CompleteAllCheckboxShapes } from '../../Shapes/Shapes';

export const CompleteAllCheckbox = ({ completeAll }) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={completeAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </>
);

CompleteAllCheckbox.propTypes = CompleteAllCheckboxShapes;
