import classnames from 'classnames';
import { useContext } from 'react';
import { Filter } from '../types/Filter';
import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const { filterType, setFilterType } = useContext(TodosContext);
  const makeSetFilterType = (type: Filter) => (
    () => setFilterType(type));

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classnames('selected', {
            selected: filterType === Filter.ALL,
          })}
          onClick={makeSetFilterType(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classnames({
            selected: filterType === Filter.ACTIVE,
          })}
          onClick={makeSetFilterType(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classnames({
            selected: filterType === Filter.COMPLETED,
          })}
          onClick={makeSetFilterType(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
