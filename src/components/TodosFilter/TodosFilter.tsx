import React from 'react';
import cl from 'classnames';

interface Props {
  isFilter: string | undefined;
  setIsFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const TodosFilter: React.FC<Props> = ({ isFilter, setIsFilter }) => {
  const handleFilterClick = (filter: string) => {
    setIsFilter(filter);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        3 items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cl({ selected: isFilter === 'All' })}
            onClick={() => handleFilterClick('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cl({ selected: isFilter === 'Active' })}
            onClick={() => handleFilterClick('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cl({ selected: isFilter === 'Completed' })}
            onClick={() => handleFilterClick('Completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
