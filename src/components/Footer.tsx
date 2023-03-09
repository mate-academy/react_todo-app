import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Todo } from '../types/Todo';

type Props = {
  activeTodos: Todo[];
  completedTodos: Todo[];
  deleteAllCompletedHandler: () => void;
  pathname: string;
};

export const Footer: React.FC<Props> = (props) => {
  const {
    activeTodos,
    completedTodos,
    deleteAllCompletedHandler,
    pathname,
  } = props;

  const filters = [
    { name: 'All', path: '/' },
    { name: 'Active', path: '/active' },
    { name: 'Completed', path: '/completed' },
  ];

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter">
        {filters.map(filter => (
          <Link
            key={filter.name}
            to={filter.path}
            className={classNames(
              'filter__link', { selected: pathname === filter.path },
            )}
          >
            {filter.name}
          </Link>

        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{ opacity: +Boolean(completedTodos.length) }}
        onClick={deleteAllCompletedHandler}
      >
        Clear completed
      </button>
    </footer>
  );
};
