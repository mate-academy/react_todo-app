import React from 'react';
import PropTypes from 'prop-types';

export const TodosToggler = ({ toggleAll, onToggleTodosStatus }) => (
  <>
    <input
      checked={toggleAll}
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={() => {
        onToggleTodosStatus();
      }}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </>
);

TodosToggler.propTypes = {
  toggleAll: PropTypes.bool.isRequired,
  onToggleTodosStatus: PropTypes.func.isRequired,
};
