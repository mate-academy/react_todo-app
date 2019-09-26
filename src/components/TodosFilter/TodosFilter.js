import React from 'react';
import { TodosFilterPropTypes } from '../../constants/proptypes';

const TodosFilter = ({
  todos,
  filterIdentifier,
  toggleFilterIdentifier,
  removeCompletedTodos,
}) => (
  <>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filterIdentifier === 'all' ? 'selected' : ''}
          onClick={() => toggleFilterIdentifier('all')}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={filterIdentifier === 'active' ? 'selected' : ''}
          onClick={() => toggleFilterIdentifier('active')}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={filterIdentifier === 'completed' ? 'selected' : ''}
          onClick={() => toggleFilterIdentifier('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
    {todos.filter(todo => todo.isCompleted).length > 0 && (
      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={removeCompletedTodos}
      >
        Clear completed
      </button>
    )}
  </>
);

TodosFilter.propTypes = TodosFilterPropTypes;

export default TodosFilter;
