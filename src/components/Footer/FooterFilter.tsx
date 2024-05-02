import { FC, useContext } from 'react';
import { FilterLink, FilterType } from '../../types/types';
import classNames from 'classnames';
import { FilterContext } from '../../Context/FilterContext';

interface IProps {
  items: FilterLink[];
}

export const FooterFilter: FC<IProps> = ({ items }) => {
  const { filterType, showAllTodos, showActiveTodos, showCompletedTodos } =
    useContext(FilterContext);

  const handleFilter = (title: string) => {
    switch (title) {
      case FilterType.Completed:
        showCompletedTodos();
        break;
      case FilterType.Active:
        showActiveTodos();
        break;
      default:
        showAllTodos();
    }
  };

  return (
    <nav className="filter" data-cy="Filter">
      {items.map(item => (
        <a
          key={item.dataCy}
          href={item.href}
          className={classNames('filter__link', {
            selected: filterType === item.title,
          })}
          data-cy={item.dataCy}
          onClick={() => {
            handleFilter(item.title);
          }}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
};
