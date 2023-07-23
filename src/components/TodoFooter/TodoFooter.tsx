import cn from 'classnames';
import { Filter } from '../../services/enums';

interface Props {
  numberOfActiveTodos: number,
  onDeleteAllCompeleted: () => void,
  filterBy: Filter,
  setFilterBy: (newFilter: Filter) => void,
  isTodosHasCompleted: boolean,
}

export const TodoFooter: React.FC<Props> = ({
  numberOfActiveTodos,
  onDeleteAllCompeleted,
  filterBy,
  setFilterBy,
  isTodosHasCompleted,
}) => (
  <footer className="footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${numberOfActiveTodos} `}
      items left
    </span>

    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: filterBy === Filter.ALL,
          })}
          onClick={() => setFilterBy(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: filterBy === Filter.ACTIVE,
          })}
          onClick={() => setFilterBy(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: filterBy === Filter.COMPLETED,
          })}
          onClick={() => setFilterBy(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>

    {isTodosHasCompleted
      && (
        <button
          type="button"
          className="clear-completed"
          onClick={onDeleteAllCompeleted}
        >
          Clear completed
        </button>
      )}
  </footer>
);
