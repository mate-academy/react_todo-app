import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { useDispatch, useGlobalState } from '../../GlobalProvider';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, filter } = useGlobalState();

  const filterTodosHandler = (curFilter: Filter) => {
    dispatch({
      type: 'setFilter',
      payload: curFilter,
    });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'clearCompleted' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link ', {
            selected: filter === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => filterTodosHandler(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link ', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => filterTodosHandler(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link ', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => filterTodosHandler(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
