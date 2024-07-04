import { Status } from '../../types/Status';
import { useDispatch, useGlobalState } from '../../GlobalStateProvider';
import { Type } from '../../types/Action';

export const Footer: React.FC = () => {
  const { todos, status } = useGlobalState();
  const dispatch = useDispatch();

  const activeList = todos.filter(todo => !todo.completed);
  const completedList = todos.filter(todo => todo.completed);

  const clearCompleted = () => {
    dispatch({ type: Type.ClearCompleted });
  };

  return todos.length > 0 ? (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeList.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={
            'filter__link ' + (status === Status.all ? 'selected' : '')
          }
          data-cy="FilterLinkAll"
          onClick={() =>
            dispatch({ type: Type.setStatus, payload: Status.all })
          }
        >
          All
        </a>

        <a
          href="#/active"
          className={
            'filter__link ' + (status === Status.active ? 'selected' : '')
          }
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: Type.setStatus, payload: Status.active })
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            'filter__link ' + (status === Status.completed ? 'selected' : '')
          }
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({ type: Type.setStatus, payload: Status.completed })
          }
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedList.length}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  ) : (
    <></>
  );
};
