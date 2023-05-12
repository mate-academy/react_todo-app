import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { FilterBy } from '../types/FilterBy';

interface Props {
  setFilterBy: Dispatch<SetStateAction<FilterBy>>,
  itemsQuantity: number,
  filterBy: FilterBy,
  onClear: () => Promise<void>,
  completedLength: number,
}

const navItems = [
  {
    title: 'All',
    id: FilterBy.ALL,
  },
  {
    title: 'Active',
    id: FilterBy.ACTIVE,
  },
  {
    title: 'Completed',
    id: FilterBy.COMPLETED,
  }];

export const TodoFooter: React.FC<Props> = ({
  setFilterBy,
  itemsQuantity,
  filterBy,
  onClear,
  completedLength,
}) => {
  const onChangeFilter = (navItemId: FilterBy) => () => {
    switch (navItemId) {
      case FilterBy.ACTIVE:
        setFilterBy(FilterBy.ACTIVE);
        break;

      case FilterBy.COMPLETED:
        setFilterBy(FilterBy.COMPLETED);
        break;

      default:
        setFilterBy(FilterBy.ALL);
        break;
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsQuantity} items left`}
      </span>

      <nav className="filter">
        {navItems.map((navItem) => (
          <a
            href="#/"
            id={navItem.id}
            className={classNames(
              'filter__link',
              {
                selected: filterBy === navItem.id,
              },
            )}
            key={navItem.id}
            onClick={onChangeFilter(navItem.id)}
          >
            {navItem.title}
          </a>
        ))}
      </nav>

      {completedLength ? (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={onClear}
        >
          Clear completed
        </button>
      ) : null}
    </footer>
  );
};
