import { useState } from 'react';
import { useTodosContext } from '../../context';
import { FilterParameter } from '../../types/FilterParameter';

export const TodosFilter = () => {
  const { filterTodos } = useTodosContext();
  const [selectedFilter, setSelectedFilter] = useState(FilterParameter.All);

  const handleFilterClick = (showParemeter: FilterParameter) => {
    setSelectedFilter(showParemeter);

    filterTodos(showParemeter);
  };

  const classNameSelectedAll
    = selectedFilter === FilterParameter.All ? 'selected' : '';
  const classNameSelectedActive
    = selectedFilter === FilterParameter.Active ? 'selected' : '';
  const classNameSelectedCompleted
    = selectedFilter === FilterParameter.Completed ? 'selected' : '';

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNameSelectedAll}
          onClick={() => {
            handleFilterClick(FilterParameter.All);
          }}
        >
          {FilterParameter.All}
        </a>
      </li>

      <li>
        <a
          href={`#/${FilterParameter.Active}`}
          className={classNameSelectedActive}
          onClick={() => {
            handleFilterClick(FilterParameter.Active);
          }}
        >
          {FilterParameter.Active}
        </a>
      </li>

      <li>
        <a
          href={`#/${FilterParameter.Completed}`}
          className={classNameSelectedCompleted}
          onClick={() => {
            handleFilterClick(FilterParameter.Completed);
          }}
        >
          {FilterParameter.Completed}
        </a>
      </li>
    </ul>
  );
};
