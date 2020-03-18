import React from 'react';
import PropTypes from 'prop-types';

export const ToggleAll = React.memo((props) => {
  const { value, onToggleAllChange } = props;

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={value}
        onChange={() => onToggleAllChange()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
});

ToggleAll.propTypes = {
  value: PropTypes.bool.isRequired,
  onToggleAllChange: PropTypes.func.isRequired,
};
