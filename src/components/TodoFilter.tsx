import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from './TodosContext';
import { TodosFilter } from '../types/TodosFilter';

export const TodoFilter: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    return null;
  }

  const { todosFilter, setTodosFilter } = context;

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
