import { FilterType } from '../types/FilterType';
import cn from 'classnames';
import { useContext } from 'react';
import { TodoContext } from './TodoContext';

type Props = {
  filterType: FilterType;
  onFilterTypeChange: (filterType: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ filterType, onFilterTypeChange }) => {
  const { todos, removeAllCompleted } = useContext(TodoContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', filterType === 'all' && 'selected')}
          data-cy="FilterLinkAll"
          onClick={() => {
            onFilterTypeChange('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', filterType === 'active' && 'selected')}
          data-cy="FilterLinkActive"
          onClick={() => {
            onFilterTypeChange('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            filterType === 'completed' && 'selected',
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            onFilterTypeChange('completed');
          }}
        >
          Completed
        </a>
      </nav>

      <button
        onClick={removeAllCompleted}
        disabled={!todos.some(todo => todo.completed)}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
