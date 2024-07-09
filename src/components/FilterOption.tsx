import cn from 'classnames';
import { FilteredOptions } from '../types/FilteredOptions';
import { useGlobalDispatch, useGlobalState } from '../Store';

type Props = {
  option: FilteredOptions;
};

export const FilterOptions: React.FC<Props> = ({
  option: { type, href, data },
}) => {
  const { filter } = useGlobalState();
  const dispatch = useGlobalDispatch();

  return (
    <a
      href={href}
      className={cn('filter__link', {
        selected: type === filter,
      })}
      data-cy={data}
      key={type}
      onClick={() => dispatch({ type: 'setFilter', payload: type })}
    >
      {type}
    </a>
  );
};
