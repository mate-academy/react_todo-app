import React, { useContext } from 'react';

import './Filters.scss';
import { QueryContext } from '../../contexts/QueryContext';
import { TodosFilterQuery } from '../../constants';

const Filters: React.FC = () => {
  const { query, setQuery } = useContext(QueryContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={query === TodosFilterQuery.all ? 'selected' : ''}
          onClick={() => setQuery(TodosFilterQuery.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={query === TodosFilterQuery.active ? 'selected' : ''}
          onClick={() => setQuery(TodosFilterQuery.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={query === TodosFilterQuery.completed ? 'selected' : ''}
          onClick={() => setQuery(TodosFilterQuery.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default Filters;
