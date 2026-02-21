import classNames from 'classnames';
import { useContext } from 'react';
import { Filters, Filter } from '../../store/filters';
import { SortContext } from '../../store/SortContext';
import { TodoContext } from '../../store/TodoContext';
import { deleteCompletedAction } from '../../store/TodoReducer';

export const Footer = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const { sortBy, sortDispatch } = useContext(SortContext);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>

      <nav className="filter" data-cy="Filter">
        {Filters.map(item => {
          return (
            <a
              key={item}
              href={`#/${item === 'all' ? '' : item}`}
              className={classNames('filter__link', {
                selected: sortBy === item,
              })}
              data-cy="FilterLinkAll"
              onClick={e => {
                e.preventDefault();
                sortDispatch(item as Filter);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
        onClick={() => dispatch(deleteCompletedAction())}
      >
        Clear completed
      </button>
    </footer>
  );
};
