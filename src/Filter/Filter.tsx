import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterParams } from './FilterParams';
import { TodosFilterLink } from '../components/TodosFilterLink';

type Props = {
  setFilterParam: (param: FilterParams) => void
  filterParam: string
};

export const Filter: React.FC<Props>
= ({
  setFilterParam: setFilterParamHandler,
  filterParam,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${filterParam === FilterParams.All ? '/' : filterParam}`);
    localStorage.setItem('filter', filterParam);
  }, [filterParam]);

  return (
    <ul className="filters">
      <li>
        <TodosFilterLink
          changeFilterParam={setFilterParamHandler}
          filterParam={FilterParams.All}
        />
      </li>

      <li>
        <TodosFilterLink
          changeFilterParam={setFilterParamHandler}
          filterParam={FilterParams.Active}
        />
      </li>

      <li>
        <TodosFilterLink
          changeFilterParam={setFilterParamHandler}
          filterParam={FilterParams.Completed}
        />
      </li>
    </ul>
  );
};
