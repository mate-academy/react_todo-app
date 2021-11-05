import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export const ToggleAll = ({ todosCompletedLength, onToggleTodos }) => {
  const isNotCompeted = !todosCompletedLength;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(isNotCompeted);
  }, [isNotCompeted]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggleTodos(!isChecked);
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={handleToggle}
        checked={isChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};

ToggleAll.propTypes = {
  todosCompletedLength: PropTypes.number.isRequired,
  onToggleTodos: PropTypes.func.isRequired,
};
