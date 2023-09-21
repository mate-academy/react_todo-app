import cn from 'classnames';
import { SortBy, Todo } from '../types';

type Props = {
  handleSetSortBy: (value:SortBy) => void,
  sortBy: SortBy,
  deleteCompletedTodos: () => void,
  completedTodosId: number[];
  todosList: Todo[]
};

const FilterAllClassName = (sortBy: SortBy) => cn(
  { selected: sortBy === SortBy.all },
);

const FilterActiveClassName = (sortBy: SortBy) => cn(
  { selected: sortBy === SortBy.active },
);

const FilterCompletedClassName = (sortBy: SortBy) => cn(
  { selected: sortBy === SortBy.completed },
);

export const TodosFilter: React.FC<Props> = ({
  handleSetSortBy,
  sortBy,
  deleteCompletedTodos,
  completedTodosId,
  todosList,
}) => (
  <footer className="footer" data-cy="todosFilter">
    <span className="todo-count" data-cy="todosCounter">
      {`${todosList.length - completedTodosId.length} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={FilterAllClassName(sortBy)}
          onClick={() => handleSetSortBy(SortBy.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={FilterActiveClassName(sortBy)}
          onClick={() => handleSetSortBy(SortBy.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={FilterCompletedClassName(sortBy)}
          onClick={() => handleSetSortBy(SortBy.completed)}
        >
          Completed
        </a>
      </li>
    </ul>

    {completedTodosId.length !== 0 && (
      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompletedTodos}
      >
        Clear completed
      </button>
    )}
  </footer>
);
