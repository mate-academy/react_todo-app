import classNames from 'classnames';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Context/TodosContext';

export const TodosFilter = () => {
  const { status } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: status === 'all',
          })}
          onClick={() => dispatch({ type: 'all' })}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: status === 'active',
          })}
          onClick={() => dispatch({ type: 'active' })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: status === 'completed',
          })}
          onClick={() => dispatch({ type: 'completed' })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
