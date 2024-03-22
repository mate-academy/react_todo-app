import { useContext } from 'react';
import { DispatchContext, Status, TodosContext, Type } from '../../store';
import classNames from 'classnames';

export const TodosFilter = () => {
  const { status } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const handleStatusChange = (newStatus: Status) => {
    dispatch({
      type: Type.SetStatus,
      payload: newStatus,
    });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href={`#/${Status.All}`}
          className={classNames('', { selected: status === Status.All })}
          onClick={() => handleStatusChange(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href={`#/${Status.Active}`}
          className={classNames('', { selected: status === Status.Active })}
          onClick={() => handleStatusChange(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href={`#/${Status.Completed}`}
          className={classNames('', {
            selected: status === Status.Completed,
          })}
          onClick={() => handleStatusChange(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
