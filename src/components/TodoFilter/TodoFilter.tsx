import { FilterLink } from '../FilterLink';

export const TodoFilter: React.FC = () => (
  <ul className="filters">
    <li>
      <FilterLink
        to="/"
        text="All"
      />
    </li>

    <li>
      <FilterLink
        to="active"
        text="Active"
      />
    </li>

    <li>
      <FilterLink
        to="completed"
        text="Completed"
      />
    </li>
  </ul>
);
