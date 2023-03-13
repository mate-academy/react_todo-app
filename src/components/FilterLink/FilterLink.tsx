import classNames from 'classnames';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { Props } from './Props';

export const FilterLink: React.FC<Props> = ({
  params,
  text,
  ...props
}) => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'All';

  return (
    <NavLink
      to={{
        search: getSearchWith(searchParams, params),
      }}
      className={classNames('filter__link',
        { selected: filter === text })}
      {...props}
    >
      {text}
    </NavLink>
  );
};
