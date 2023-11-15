import { useContext, useMemo } from 'react';
import classNames from 'classnames';

import { FilterTodos } from '../../types/FilterTodos';
import { TodosContext } from '../TodosContext';

type Props = {};

export const TodosFilter: React.FC<Props> = () => {
  const { filterTodos, setFilterTodos } = useContext(TodosContext);

  const filters = useMemo(() => Object.values(FilterTodos), [FilterTodos]);

  return (
    <ul className="filters">
      {filters.map((nameButton) => (
        <li key={nameButton}>
          <a
            href={`#/${nameButton.toLowerCase()}`}
            className={classNames({
              selected: nameButton === filterTodos,
            })}
            onClick={() => {
              setFilterTodos(nameButton as FilterTodos);
            }}
          >
            {nameButton}
          </a>
        </li>
      ))}
    </ul>
  );
};
