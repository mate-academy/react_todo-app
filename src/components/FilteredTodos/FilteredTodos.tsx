import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const FilteredTodos:React.FC = () => {
  const { filt, Position, setFilt } = useContext(TodosContext);

  const handleChange = (status: any) => {
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
