import { NavLink } from 'react-router-dom';

type Props = {
  onClear: () => void,
  onSettingStatus: (str: string) => void,
  onCountCompleted: () => number,
};
export const TodosFilter: React.FC<Props> = ({
  onClear,
  onSettingStatus,
  onCountCompleted,
}) => {
  return (
    <>
      <footer className="footer">
        <div className="todo-count" data-cy="todosCounter">
          {onCountCompleted()}
          {' '}
          items left
        </div>

        <ul className="filters">
          <li>
            <NavLink
              to="/"
              className="navlink"
              onClick={() => onSettingStatus('all')}
            >
              All
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/active"
              className="navlink"
              onClick={() => onSettingStatus('active')}
            >
              Active
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/completed"
              className="navlink"
              onClick={() => onSettingStatus('completed')}
            >
              Completed
            </NavLink>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={onClear}
        >
          Clear completed
        </button>
      </footer>

    </>
  );
};
