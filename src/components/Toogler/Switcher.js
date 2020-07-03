import React from 'react';
import PropTypes from 'prop-types';

function Switcher({ todos, topToggle }) {
  return (
    <div>
      <>
        <input
          onChange={event => topToggle(event.target.checked)}
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          value="toggle-all"
        />
        {todos.length > 0 && (
          <label htmlFor="toggle-all">Mark all as complete</label>
        )}
      </>

    </div>
  );
}

export default Switcher;

Switcher.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  topToggle: PropTypes.func.isRequired,
};
