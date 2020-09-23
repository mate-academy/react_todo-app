import React from 'react';
import PropTypes from 'prop-types';

export const TodosToggler = ({ onToggleTodosStatus, activeTodosLength }) => (
  <>
    <input
      checked={activeTodosLength === 0}
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={onToggleTodosStatus}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </>
);

TodosToggler.propTypes = {
  onToggleTodosStatus: PropTypes.func.isRequired,
  activeTodosLength: PropTypes.number.isRequired,
};
