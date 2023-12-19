import classNames from 'classnames';
import React, { useContext } from 'react';
import { StateContext } from '../../store/Store';

import { filterOptions } from '../../constants/filterOptions';

export const TodosFilter: React.FC = () => {
  const { currentFilter } = useContext(StateContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      {filterOptions.map(({ title, hash }) => (
        <li key={hash}>
          <a
            href={hash}
            className={classNames({
              selected: hash === currentFilter.hash,
            })}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};
