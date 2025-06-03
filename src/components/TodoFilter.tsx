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

// 🔧 Função auxiliar para normalizar o hash
const normalize = (url: string) => url.replace(/\/$/, '');

const TodosFilter: React.FC<Props> = ({ currentUrl = '#/all/' }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {filters.map(({ title, hash }) => (
        <a
          data-cy={`FilterLink${title}`}
          href={hash}
          key={hash}
          className={classNames('filter__link', {
            // 🔧 Corrigida a comparação para funcionar mesmo com "/" no final
            selected: normalize(hash) === normalize(currentUrl),
          })}
        >
          {title}
        </a>
      ))}
    </nav>
  );
};

export default TodosFilter;
