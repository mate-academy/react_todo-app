import { useContext } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';

type Props = {
  filterBy: Filter;
  activeCount: number;
  visibleTodos: Todo[];
  setFilterBy: React.Dispatch<React.SetStateAction<Filter>>;
  onDelete: (value: number) => void;
};

export const Footer: React.FC<Props> = ({
  filterBy,
  activeCount,
  visibleTodos,
  setFilterBy,
}) => {
  const context = useContext(TodosContext);
  const { saveTodos } = context;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === Filter.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(Filter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === Filter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterBy(Filter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === Filter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        disabled={visibleTodos.every(todo => !todo.completed)}
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          saveTodos(visibleTodos.filter(todo => !todo.completed));
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
