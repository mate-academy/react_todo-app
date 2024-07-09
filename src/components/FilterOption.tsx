import cn from 'classnames';
import { FilteredOptions } from '../types/FilteredOptions';
import { SelectedFilter } from '../types/SelectedFilter';
import { SetStateAction } from 'react';

type Props = {
  option: FilteredOptions;
  filter: SelectedFilter;
  setFilter: React.Dispatch<SetStateAction<SelectedFilter>>;
};

export const FilterOptions: React.FC<Props> = ({
  option: { type, href, data },
  filter,
  setFilter,
}) => {
  return (
    <a
      href={href}
      className={cn('filter__link', {
        selected: type === filter,
      })}
      data-cy={data}
      key={type}
      onClick={() => setFilter(type)}
    >
      {type}
    </a>
  );
};
