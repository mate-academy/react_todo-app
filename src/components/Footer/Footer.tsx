import { useDispatch, useStateValue } from '../../GlobalProvider';
import { ActionTypes } from '../../types/ActionTypes';
import { Filters } from '../../types/Filters';
import classNames from 'classnames';

export const Footer = () => {
  const { activeCount, filter, completedCount } = useStateValue();
  const dispatch = useDispatch();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {Object.values(Filters).map(value => (
          <a
            key={value}
            href={value === Filters.ALL ? '#/' : `#/${value}`}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={event => {
              event.preventDefault();

              dispatch({ type: ActionTypes.SET_FILTER, payload: value });
            }}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: ActionTypes.CLEAR_COMPLETED })}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
