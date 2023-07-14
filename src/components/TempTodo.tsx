import React from 'react';
import { Loader } from './Loader';

type Props = {
  value: string
};

export const TempTodo:React.FC<Props> = ({ value }) => (
  <li>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id="toggle-view"
      />
      <label style={{ opacity: 0.5 }}>
        {value}
      </label>
      <button
        type="button"
        className="destroy"
        data-cy="deleteTodo"
        aria-label="Delete"
      />
    </div>

    <Loader />
  </li>
);
