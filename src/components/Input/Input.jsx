import React from 'react';
import { InputShape } from '../../shapes/InputShape';

export const Input = ({
  id,
  completed,
  handleChecked,
  isTextThrough,
}) => (
  <input
    type="checkbox"
    className="toggle"
    checked={completed}
    onChange={() => {
      handleChecked(id, !completed);
      isTextThrough(!completed);
    }}
  />
);

Input.propTypes = InputShape;
