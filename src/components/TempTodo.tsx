import React from 'react';
import { Loader } from './Loader';

type Props = {
  title: string
};

export const TempTodo:React.FC<Props> = ({ title }) => {
  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
        />
        <label style={{ opacity: 0.5 }}>
          {title}
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
};
