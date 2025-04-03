import React, { useContext } from 'react';
import cn from 'classnames';
import { FilterStatus } from '../types/Todo';
import { TodoContext } from '../Context/TodoContext';

const filterOptions = [
  {
    title: 'All',
    href: '#/',
    dataCY: 'FilterLinkAll',
    status: FilterStatus.DEFAULT,
  },
  {
    title: 'Active',
    href: '#/active',
    dataCY: 'FilterLinkActive',
    status: FilterStatus.ACTIVE,
  },
  {
    title: 'Completed',
    href: '#/completed',
    dataCY: 'FilterLinkCompleted',
    status: FilterStatus.COMPLETED,
  },
];

interface Props {}

export const FooterTodoApp: React.FC<Props> = () => {
  const { todos, setFilterStatus, filterStatus, handleClearAllCompleted } =
    useContext(TodoContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptions.map(option => {
          return (
            <a
              key={option.title}
              href={option.href}
              className={cn('filter__link', {
                selected: filterStatus === option.status,
              })}
              data-cy={option.dataCY}
              onClick={() => setFilterStatus(option.status)}
            >
              {option.title}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleClearAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
