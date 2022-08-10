// import classNames from 'classnames';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filterCriteria: string | undefined;
  pendingTasksCount: number;
  completedTasks: number;
  setlistOfTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Footer: React.FC<Props>
= (
  {
    filterCriteria,
    pendingTasksCount,
    completedTasks,
    setlistOfTodos,
  },
) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${pendingTasksCount} items left`}
      </span>

      <ul className="filters">
        <li>
          <Link
            to="/"
            className={classNames({ selected: !filterCriteria })}
          >
            All
          </Link>
        </li>

        <li>
          <Link
            to="/active"
            className={classNames({ selected: filterCriteria === 'active' })}
          >
            Active
          </Link>
        </li>

        <li>
          <Link
            className={classNames({ selected: filterCriteria === 'completed' })}
            to="/completed"
          >
            Completed
          </Link>
        </li>
      </ul>

      <button
        hidden={completedTasks === 0}
        type="button"
        className="clear-completed"
        onClick={() => {
          setlistOfTodos(prev => [...prev].filter(el => !el.completed));
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
