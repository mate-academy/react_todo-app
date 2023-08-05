import { useContext } from 'react';
import cn from 'classnames';

import { TodoContext } from '../../context/TodoContext';
import { Status } from '../../types/Status';

const links = [
  { path: '#/', name: 'All', status: Status.All },
  { path: '#/active', name: 'Active', status: Status.Active },
  { path: '#/completed', name: 'Completed', status: Status.Completed },
];

export const TodoFilter: React.FC = () => {
  const { status, setStatus } = useContext(TodoContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      {links.map(link => (
        <li key={link.name}>
          <a
            href={link.path}
            className={cn({
              selected: status === link.status,
            })}
            onClick={() => setStatus(link.status)}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
