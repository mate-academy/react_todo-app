import classNames from 'classnames';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Context/TodosContext';
import { Status } from '../../types/TodoApp';

export const TodosFilter = () => {
  const { status } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: status === Status.All,
          })}
          onClick={() => dispatch({ type: Status.All })}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: status === Status.Active,
          })}
          onClick={() => dispatch({ type: Status.Active })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: status === Status.Completed,
          })}
          onClick={() => dispatch({ type: Status.Completed })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
