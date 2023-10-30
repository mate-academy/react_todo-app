import classNames from 'classnames';
import { Filters, Filter } from '../types/Filters';

type Props = {
  filters: Filter[],
  filterBy: Filters,
  onFilterBy: (value: Filters) => void;
};

export const TodosFilter: React.FC<Props> = ({
  filters,
  filterBy,
  onFilterBy,
}) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(({ href, title }) => {
        return (
          <li key={href}>
            <a
              href={`#${href}`}
              className={classNames({
                selected: filterBy === title,
              })}
              onClick={() => onFilterBy(title)}
            >
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
