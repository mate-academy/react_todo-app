import React from 'react';
import PropTypes from 'prop-types';

export const ToggleAll = ({ allCompleted, handleToggleAll }) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={allCompleted}
      onChange={handleToggleAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </>
);

ToggleAll.propTypes = {
  allCompleted: PropTypes.bool.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
};
