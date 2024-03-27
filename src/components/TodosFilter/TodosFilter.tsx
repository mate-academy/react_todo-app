import { useContext } from 'react';
import { Status } from '../../units/units';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../context/TodosContext';

export const TodosFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { filter } = useContext(StateContext);

  const handleClickedAll = () => {
    dispatch({ type: 'SHOW_ALL' });
  };

  const handleClickedActive = () => {
    dispatch({ type: 'SHOW_ACTIVE' });
  };

  const handleClickedCompleted = () => {
    dispatch({ type: 'SHOW_COMPLETED' });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: Status.All === filter })}
          onClick={handleClickedAll}
        >
          {Status.All}
        </a>
      </li>

      <li>
        <a
          onClick={handleClickedActive}
          className={classNames({ selected: Status.Active === filter })}
          href="#/active"
        >
          {Status.Active}
        </a>
      </li>

      <li>
        <a
          onClick={handleClickedCompleted}
          className={classNames({ selected: Status.Completed === filter })}
          href="#/completed"
        >
          {Status.Completed}
        </a>
      </li>
    </ul>
  );
};
