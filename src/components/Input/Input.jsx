import React from 'react';
import { InputShape } from '../shapes/InputShape';

export const Input = ({
  id,
  completed,
  handleChecked,
}) => (
  <input
    type="checkbox"
    className="toggle"
    checked={completed}
    onChange={() => {
      handleChecked(id, !completed);
    }}
  />
);

Input.propTypes = InputShape;
