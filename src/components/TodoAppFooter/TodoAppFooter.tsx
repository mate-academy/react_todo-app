import React, { useContext } from 'react';
import { FilterBy } from '../../types/Types';
import classNames from 'classnames';
import { TodoContext } from '../../utils/TodoContext';

export const TodoAppFooter: React.FC = () => {
  const {
    filterBy,
    hasSomeCompleted,
    activeTodosCount,
    setFilterBy,
    deleteCompletedTodos,
  } = useContext(TodoContext);

  const filters: { name: string; value: FilterBy; link: string }[] = [
    { name: 'All', value: FilterBy.All, link: '#/' },
    { name: 'Active', value: FilterBy.Active, link: '#/active' },
    { name: 'Completed', value: FilterBy.Completed, link: '#/completed' },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(({ name, value, link }) => (
          <a
            key={value}
            href={link}
            className={classNames('filter__link', {
              selected: filterBy === value,
            })}
            data-cy={`FilterLink${name}`}
            onClick={() => setFilterBy(value)}
          >
            {name}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasSomeCompleted}
        onClick={deleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
