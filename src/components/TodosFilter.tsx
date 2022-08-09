import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  filter: string,
};

export const TodosFilter: FC<Props> = ({ filter }) => {
  return (
    <ul className="TodosFilter">
      <li>
        <Link to="/" className={filter === '/' ? 'selected' : ''}>
          All
        </Link>
      </li>

      <li>
        <Link
          to="/active"
          className={filter === '/active' ? 'selected' : ''}
        >
          Active
        </Link>
      </li>

      <li>
        <Link
          to="/completed"
          className={filter === '/completed' ? 'selected' : ''}
        >
          Completed
        </Link>
      </li>
    </ul>
  );
};
