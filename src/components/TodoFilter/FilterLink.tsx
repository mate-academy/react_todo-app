import cn from 'classnames';
import { Filter } from '../../context/types';

type Props = {
  filter: Filter;
  isActive: boolean;
  onFilterChange: (filter: Filter) => void;
};

export const FilterLink = ({ filter, isActive, onFilterChange }: Props) => {
  const capitalizedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);

  return (
    <a
      href={`#/${filter}`}
      className={cn('filter__link', isActive && 'selected')}
      data-cy={`FilterLink${capitalizedFilter}`}
      onClick={() => onFilterChange(filter)}
    >
      {capitalizedFilter}
    </a>
  );
};
