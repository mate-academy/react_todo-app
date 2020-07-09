import React from 'react';

import { AddFormShapes } from '../../Shapes/Shapes';

export const AddForm = ({ onChange, onSubmit }) => (
  <form onSubmit={event => onSubmit(event)}>
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={event => onChange(event.target.value)}
    />
  </form>
);

AddForm.propTypes = AddFormShapes;
