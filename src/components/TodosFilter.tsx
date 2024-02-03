import React, { useContext } from 'react';
import { StatusContext } from '../providers/StatusProvider';

type Props = {};

enum Status {
  All = '#/',
  Active = '#/active',
  Completed = '#/completed',
}

export const TodosFilter: React.FC<Props> = React.memo(() => {
  const { selectedStatus, setSelectedStatus } = useContext(StatusContext);

  return (
    <ul className="filters">
      {Object.entries(Status).map(([status, href]) => (
        <li key={href}>
          <a
            href={href}
            className={selectedStatus === href ? 'selected' : ''}
            onClick={() => setSelectedStatus(href as Status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
});
