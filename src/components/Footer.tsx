import classNames from 'classnames';
import { Todo } from '../types/Todo';

type FooterProps = {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  filteredTodos: {
    todosCompleted: Todo[];
    todosNotCompleted: Todo[];
  };
  removeCompletedTodos: () => void;
};

export const Footer = ({
  selectedFilter,
  setSelectedFilter,
  filteredTodos,
  removeCompletedTodos,
}: FooterProps) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {filteredTodos.todosNotCompleted.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={filteredTodos.todosCompleted.length <= 0}
        data-cy="ClearCompletedButton"
        onClick={removeCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
