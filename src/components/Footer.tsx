import { FilterType } from '../constants/FilterType';
import { useDispatch, useGlobalState } from '../hooks/GlobalHooks';
import { filterTodos } from '../utils/filterTodos';
import cn from 'classnames';

type Props = {
  filterBy: FilterType;
  setFilterBy: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ filterBy, setFilterBy }) => {
  const { todos } = useGlobalState();
  const dispatch = useDispatch();
  const activeTodosCount = filterTodos(todos, FilterType.Active).length;
  const completedTodosCount = filterTodos(todos, FilterType.Completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} items left`}
      </span>
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(value => {
          const title = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <a
              key={`link-${value}`}
              href={`#/${value === FilterType.All ? '' : value.toLowerCase()}`}
              className={cn('filter__link', { selected: value === filterBy })}
              data-cy={`FilterLink${title}`}
              onClick={() => setFilterBy(value)}
            >
              {title}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodosCount}
        onClick={() => dispatch({ type: 'clearCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
