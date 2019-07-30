import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ toggleAll }) => (
  <div>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={toggleAll}
    />
    {/* eslint-disable-next-line */}
    <label htmlFor="toggle-all">
      Mark all as complete
    </label>
  </div>
);

Toggle.propTypes = {
  toggleAll: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Toggle;
