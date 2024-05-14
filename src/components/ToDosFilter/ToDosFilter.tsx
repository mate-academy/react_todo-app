import cn from 'classnames';
import React, { useContext } from 'react';
import { ToDoContext } from '../../context/ToDoProvider';
import { Status } from '../../types/Status';

const ToDosFilter: React.FC = () => {
  const { locationPage } = useContext(ToDoContext);

  const filters = [
    { name: 'All', path: '/', status: Status.all },
    { name: 'Active', path: '/active', status: Status.active },
    { name: 'Completed', path: '/completed', status: Status.completed },
  ];

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(({ name, path, status }) => (
        <li key={path}>
          <a
            href={`#${path}`}
            className={cn({ selected: status === locationPage })}
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ToDosFilter;
