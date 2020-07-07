import React from 'react';
import PropTypes from 'prop-types';

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

CompleteAllCheckbox.propTypes = {
  completeAll: PropTypes.func.isRequired,
};
