import { Filter } from '../types/Filter';

type Props = {
  filter: string;
  onFilterChange?: (filter: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterChange = () => {},
}) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={filter === Filter.ALL ? 'selected' : ''}
          onClick={() => {
            onFilterChange(Filter.ALL);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === Filter.ACTIVE ? 'selected' : ''}
          onClick={() => {
            onFilterChange(Filter.ACTIVE);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === Filter.COMPLETED ? 'selected' : ''}
          onClick={() => {
            onFilterChange(Filter.COMPLETED);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
