import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Todo } from '../types/Todo';

interface Status {
  isActive: boolean;
}

type Props = {
  todos: Todo[],
  deleteCompleted: () => void,
};

export const TodosFilter: React.FC<Props> = ({
  todos,
  deleteCompleted,
}) => {
  const uncompletedTasks = todos.filter(todo => !todo.completed);

  const isLinkActive = (status: Status): string => {
    return classNames({
      selected: status.isActive,
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTasks.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink to="/" className={isLinkActive}>All</NavLink>
        </li>

        <li>
          <NavLink to="/active" className={isLinkActive}>Active</NavLink>
        </li>

        <li>
          <NavLink to="/completed" className={isLinkActive}>Completed</NavLink>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => deleteCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
