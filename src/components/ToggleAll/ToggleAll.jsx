import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function ToggleAll({ onToggleTodos, pendingToDo }) {
  const [isChecked, setIsChecked] = useState(false);
  const isFalse = !pendingToDo;

  useEffect(() => {
    setIsChecked(isFalse);
  }, [isFalse]);

  const handleIsAllChecked = () => {
    setIsChecked(!isChecked);
    onToggleTodos(!isChecked);
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={handleIsAllChecked}
        checked={isChecked}
        id="toggle-all"
        className="toggle-all"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}

ToggleAll.propTypes = {
  onToggleTodos: PropTypes.func.isRequired,
  pendingToDo: PropTypes.number.isRequired,
};
