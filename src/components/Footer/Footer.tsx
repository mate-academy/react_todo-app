import { Status } from '../../types/Status';
import { useDispatch, useGlobalState } from '../../GlobalStateProvider';
import { Type } from '../../types/Action';

export const Footer: React.FC = () => {
  const { todos, status } = useGlobalState();
  const dispatch = useDispatch();

  const activeList = todos.filter(todo => !todo.completed);
  const completedList = todos.filter(todo => todo.completed);

  const shouldDisable = completedList.length ? false : true;

  const clearCompleted = () => {
    dispatch({ type: Type.ClearCompleted });
  };

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeList.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(statusValue => (
          <a
            key={statusValue}
            href="#/"
            className={
              'filter__link ' + (status === statusValue ? 'selected' : '')
            }
            data-cy={
              'FilterLink' +
              statusValue.charAt(0).toUpperCase() +
              statusValue.slice(1)
            }
            onClick={() =>
              dispatch({ type: Type.setStatus, payload: statusValue })
            }
          >
            {statusValue}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={shouldDisable}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
