import React from 'react';
import classNames from 'classnames';
import { Status } from '../types/Type';
import { useTodoContext } from '../context/TodosContext';

export const Filter: React.FC = () => {
  const { status, setStatus } = useTodoContext();

  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(Status).map(value => (
        <li key={value}>
          <a
            href={`#${value}`}
            className={classNames('filter__link', {
              selected: status === value,
            })}
            onClick={() => setStatus(value)}
            data-cy={`FilterLink${value}`}
          >
            {value}
          </a>
        </li>
      ))}
    </ul>
  );
};
