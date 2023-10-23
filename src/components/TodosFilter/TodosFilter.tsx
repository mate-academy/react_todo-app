import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext';
import { Status } from '../../types';

const FILTER_BTNS_DATA = [
  { path: '#/', filterValue: Status.All, label: 'All' },
  { path: '#/active', filterValue: Status.Active, label: 'Active' },
  { path: '#/completed', filterValue: Status.Completed, label: 'Completed' },
];

export const TodosFilter: React.FC = () => {
  const {
    incompletedCount,
    isAnyCompleted,
    removeCompleted,
    status,
    setStatus,
  } = useContext(TodosContext);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${incompletedCount} items left`}
      </span>

      <ul className="filters">
        {FILTER_BTNS_DATA.map(item => (
          <li key={item.path}>
            <a
              href={item.path}
              className={classNames({
                selected: status === item.filterValue,
              })}
              onClick={() => setStatus(item.filterValue)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {isAnyCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={removeCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
