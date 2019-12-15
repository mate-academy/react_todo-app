import React from 'react';
import PropTypes from 'prop-types';

function Toogler({ todos, setStateByEtargetValue }) {
  return (
    <div>
      {todos.length > 0
        && (
        <>
          <input
            onClick={(w) => {
              setStateByEtargetValue(w);
            }}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            value="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
        )
      }
    </div>
  );
}

export default Toogler;

Toogler.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStateByEtargetValue: PropTypes.func.isRequired,
};
