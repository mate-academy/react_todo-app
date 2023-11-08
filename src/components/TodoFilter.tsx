import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from './TodosContext';
import { TodosFilter } from '../types/TodosFilter';

export const TodoFilter: React.FC = () => {
  const {
    todosFilter,
    setTodosFilter,
  } = useContext(TodosContext);

  const handleLink = (val: string) => {
    if (TodosFilter.all) {
      return '#/';
    }

    return `#/${val.toLowerCase()}`;
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.values(TodosFilter).map(val => (
        <li key={val}>
          <a
            href={handleLink(val)}
            onClick={() => setTodosFilter(val)}
            className={cn({ selected: todosFilter === val })}
          >
            {val}
          </a>
        </li>
      ))}
    </ul>
  );
};
