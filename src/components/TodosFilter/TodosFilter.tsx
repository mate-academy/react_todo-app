import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  sortParam: string;
  setSortParam: (value: string) => void;
};

export const TodosFilter: React.FC<Props> = ({ sortParam, setSortParam }) => (
  <nav className="filters">
    <Link
      to="../"
      className={classNames(
        'filter__link',
        { selected: sortParam === 'all' },
      )}
      onClick={() => setSortParam('all')}
    >
      All
    </Link>

    <Link
      to="../active"
      className={classNames(
        'filter__link',
        { selected: sortParam === 'active' },
      )}
      onClick={() => setSortParam('active')}
    >
      Active
    </Link>

    <Link
      to="../completed"
      className={classNames(
        'filter__link',
        { selected: sortParam === 'completed' },
      )}
      onClick={() => setSortParam('completed')}
    >
      Completed
    </Link>
  </nav>
);
