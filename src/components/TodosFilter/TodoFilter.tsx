import React from 'react';
import cn from 'classnames';

enum Status {
  all = '#/',
  active = '#/active',
  completed = '#/completed',
}

interface Props {
  status: string,
  onChangeStatus: (el: string) => void,
}

export const TodosFilter: React.FC<Props> = ({ status, onChangeStatus }) => (
  <ul
    className="filters"
    data-cy="todosFilter"
  >
    <li>
      <a
        href={Status.all}
        onClick={() => onChangeStatus(Status.all)}
        className={cn({ selected: status === Status.all })}
      >
        All
      </a>
    </li>

    <li>
      <a
        href={Status.active}
        onClick={() => onChangeStatus(Status.active)}
        className={cn({ selected: status === Status.active })}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href={Status.completed}
        onClick={() => onChangeStatus(Status.completed)}
        className={cn({ selected: status === Status.completed })}
      >
        Completed
      </a>
    </li>
  </ul>
);
