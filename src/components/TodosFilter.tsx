import classNames from 'classnames';

export const enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

type Props = {
  filter: Status;
  setFilter: (filter: Status) => void;
};

const TodosFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filter === Status.All })}
          onClick={() => setFilter(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filter === Status.Active })}
          onClick={() => setFilter(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: filter === Status.Completed })}
          onClick={() => setFilter(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodosFilter;
