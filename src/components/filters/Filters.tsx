/* eslint-disable jsx-a11y/control-has-associated-label */
import './filters.css';

// interface Props {

// }

export const Filters: React.FC = () => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a href="#/" className="selected">All</a>
      </li>

      <li>
        <a href="#/active">Active</a>
      </li>

      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
  );
};
