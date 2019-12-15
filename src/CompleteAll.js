import React from 'react';
import PropTypes from 'prop-types';

const CompleteAll = ({ isCompletedAll, markAllCompleted }) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={isCompletedAll}
      onChange={event => markAllCompleted(event.target.checked)}
    />
    <label htmlFor="toggle-all">
      Mark all as complete
    </label>
  </>
);

CompleteAll.propTypes = {
  isCompletedAll: PropTypes.bool.isRequired,
  markAllCompleted: PropTypes.func.isRequired,
};

export default CompleteAll;
