import React, { useContext } from 'react';
import { Loader } from './Loader';
import { TodoContext } from './TodoContext';

export const TempTodo:React.FC = () => {
  const { inputValue } = useContext(TodoContext);

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
        />
        <label style={{ opacity: 0.5 }}>
          {inputValue}
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
