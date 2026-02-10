import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  setFilter: (data: string | undefined) => void;
};

const enum FilterType {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export const Filter: React.FC<Props> = ({ setFilter }) => {
  const FILTERS = [FilterType.All, FilterType.Completed, FilterType.Active];
  const [selected, setSelected] = useState<string | undefined>('all');

  const nameFormat = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const filterHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelected(event.currentTarget.dataset.filter);
    setFilter(event.currentTarget.dataset.filter);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {FILTERS.map(item => (
        <a
          href={`#/${item}`}
          className={classNames({
            filter__link: true,
            selected: item === selected,
          })}
          data-cy={`FilterLink${nameFormat(item)}`}
          key={item}
          data-filter={item}
          onClick={filterHandler}
        >
          {nameFormat(item)}
        </a>
      ))}
    </nav>
  );
};
