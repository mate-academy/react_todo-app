import React, { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../../Store';
import { filters } from '../../lib/filters';

export const Filters: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { filter } = useContext(StateContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(f => (
        <li key={f.title}>
          <a
            href={f.link}
            className={cn({
              selected: f.title === filter.title,
            })}
            onClick={() => dispatch({ type: 'setFilter', payload: f })}
          >
            {f.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
