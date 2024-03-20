import classNames from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../utils/TodosContext';
import { Filter } from '../../type/type';

const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Filter.All,
          })}
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Filter.Active,
          })}
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Filter.Completed,
          })}
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodoFilter;
