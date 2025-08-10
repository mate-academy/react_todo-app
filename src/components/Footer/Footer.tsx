import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Actions } from '../../constants/Actions';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';

const Footer = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('TodosContext must be used within a TodosProvider');
  }

  const {
    state: { todos, filter },
    dispatch,
  } = context;

  const hasCompleted = todos.some(todo => todo.completed);
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterType => (
          <a
            key={filterType}
            href={`#/${filterType === Filter.All ? '' : filterType}`}
            className={classNames('filter__link', {
              selected: filter === filterType,
            })}
            data-cy={`FilterLink${capitalize(filterType)}`}
            onClick={e => {
              e.preventDefault();
              dispatch({ type: Actions.FILTER, payload: filterType });
            }}
          >
            {capitalize(filterType)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: Actions.CLEAR })}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
