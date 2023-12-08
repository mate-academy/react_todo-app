import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { Position } from '../types/Position';

export const FilteredTodos:React.FC = () => {
  const { filt, setFilt } = useContext(TodosContext);

  const handleChange = (status: Position) => {
    setFilt(status);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filt === Position.All ? 'active' : ''}
          onClick={() => handleChange(Position.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => handleChange(Position.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => handleChange(Position.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
