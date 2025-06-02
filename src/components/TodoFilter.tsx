import classNames from 'classnames';
import { Status } from '../types/Status';
import React from 'react';

const filters = [
  {
    title: 'All',
    hash: Status.all,
  },
  {
    title: 'Active',
    hash: Status.active,
  },
  {
    title: 'Completed',
    hash: Status.completed,
  },
];

type Props = {
  currentUrl: string;
};

const TodosFilter: React.FC<Props> = ({ currentUrl = '#/all/' }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {filters.map(({ title, hash }) => (
        // <div className="filter__link" key={hash} data-cy={`FilterLink${title}`}>
        <a
          data-cy={`FilterLink${title}`}
          href={hash}
          key={hash}
          defaultValue={Status.all}
          className={classNames('filter__link', {
            selected: hash === currentUrl,
          })}
        >
          {title}
        </a>
        // </div>
      ))}
    </nav>
  );
};

export default TodosFilter;
