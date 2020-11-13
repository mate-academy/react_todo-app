import React from 'react';

export const Input = ({
  id,
  completed,
  handleChecked,
}) => (
  <input
    type="checkbox"
    className="toggle"
    checked={completed}
    onChange={() => handleChecked(id, !completed)}
  />
);
