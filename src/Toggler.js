import React from 'react';
import { ShapeToggler } from './Shapes';

export const Toggler = ({ selectAll, allSelected }) => (
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

Toggler.propTypes = ShapeToggler.isRequired;
