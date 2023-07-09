import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FilterParams } from '../Filter/FilterParams';

type Props = {
  changeFilterParam: (param: FilterParams) => void,
  filterParam: FilterParams,
};

export const TodosFilterLink: FC<Props>
= ({ changeFilterParam, filterParam }) => {
  const title = filterParam.charAt(0).toUpperCase() + filterParam.slice(1);

  return (
    <NavLink
      to={filterParam === 'all' ? '/' : filterParam}
      className={({ isActive }) => classNames(
        'filter__link',
        { selected: isActive },
      )}
      onClick={() => {
        changeFilterParam(filterParam);
        localStorage.setItem('filter', filterParam);
      }}
    >
      {title}
    </NavLink>
  );
};
