import { memo } from 'react';
import classNames from 'classnames';

import { Status } from '../../types';

type Props = {
  status: Status;
  onStatusChange: (newStatus: Status) => void;
};

export const TodosFilter: React.FC<Props> = memo(({
  status,
  onStatusChange,
}) => (
  <ul className="filters" data-cy="todosFilter">
    {Object.entries(Status).map(([option, value]) => {
      const href = value === Status.All ? '#/' : `#/${value}`;

      return (
        <li key={value}>
          <a
            href={href}
            className={classNames({
              selected: value === status,
            })}
            onClick={() => onStatusChange(value as Status)}
          >
            {option}
          </a>
        </li>
      );
    })}
  </ul>
));
