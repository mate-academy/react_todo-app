import { Link } from 'react-router-dom';

export const TodoFilter: React.FC = () => {
  return (
    <ul className="filters">
      <li>
        <Link to="/">All</Link>
      </li>

      <li>
        <Link to="/active">Active</Link>
      </li>

      <li>
        <Link to="/completed">Completed</Link>
      </li>
    </ul>
  );
};
