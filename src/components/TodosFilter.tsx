import { Status } from '../types/todo';

type Props = {
  setFilterStatus: (status: Status) => void,
};

export const TodosFilter: React.FC<Props> = ({ setFilterStatus }) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          onClick={() => setFilterStatus(Status.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => setFilterStatus(Status.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => setFilterStatus(Status.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
