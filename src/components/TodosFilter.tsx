import { useContext } from 'react';
import { TodosContext } from '../services/Store';
import { Status } from '../types/Status';

export const TodosFilter: React.FC = () => {
  const { setFilter, filter } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li>
        <a
          onClick={() => {
            setFilter(Status.All);
          }}
          href="#/"
          className={filter === Status.All ? 'selected' : ''}
        >
          All
        </a>
      </li>

      <li>
        <a
          onClick={() => {
            setFilter(Status.Active);
          }}
          className={filter === Status.Active ? 'selected' : ''}
          href="#/active"
        >
          Active
        </a>
      </li>

      <li>
        <a
          onClick={() => {
            setFilter(Status.Completed);
          }}
          className={filter === Status.Completed ? 'selected' : ''}
          href="#/completed"
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
