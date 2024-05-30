import cn from 'classnames';
import { useContext } from 'react';
import { DispatchContext, Status, TodoContext, Type } from '../todoStorage';

export const TodoFilterPanel = () => {
  const { status } = useContext(TodoContext);
  const dispatch = useContext(DispatchContext);

  const handleChangeStatus = (newStatus: Status) => {
    dispatch({
      type: Type.setStatus,
      payload: newStatus,
    });
  };

  return (
    /* Active link should have the 'selected' class */
    <nav className="filter" data-cy="Filter">
      <a
        href={`#/${Status.All}`}
        className={cn('filter__link', { selected: status === Status.All })}
        data-cy="FilterLinkAll"
        onClick={() => handleChangeStatus(Status.All)}
      >
        All
      </a>

      <a
        href={`#/${Status.Active}`}
        className={cn('filter__link', { selected: status === Status.Active })}
        data-cy="FilterLinkActive"
        onClick={() => handleChangeStatus(Status.Active)}
      >
        Active
      </a>

      <a
        href={`#/${Status.Completed}`}
        className={cn('filter__link', {
          selected: status === Status.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => handleChangeStatus(Status.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
