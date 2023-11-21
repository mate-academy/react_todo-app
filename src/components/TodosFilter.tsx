import cn from 'classnames';

import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { FilterOption } from '../types/FilterOption';

export const TodosFilter: React.FC = () => {
  const {
    filterOption,
    setFilterOption,
  } = useContext(TodosContext);

  const handleClickAll = () => {
    setFilterOption(FilterOption.All);
  };

  const handleClickActive = () => {
    setFilterOption(FilterOption.Active);
  };

  const handleClickCompleted = () => {
    setFilterOption(FilterOption.Completed);
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filterOption === FilterOption.All,
          })}
          onClick={handleClickAll}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: filterOption === FilterOption.Active,
          })}
          onClick={handleClickActive}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={handleClickCompleted}
          className={cn({
            selected: filterOption === FilterOption.Completed,
          })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
