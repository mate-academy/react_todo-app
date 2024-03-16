import { useContext } from 'react';
import { Status } from '../../types/Status';
import { DispatchContext, StateContext } from '../TodosContext';

export const TodosFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { filter } = useContext(StateContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={Status.all === filter ? 'selected' : ''}
          onClick={() => dispatch({ type: 'setFilter', payload: Status.all })}
        >
          All
        </a>
      </li>

      <li>
        <a
          className={Status.active === filter ? 'selected' : ''}
          href="#/active"
          onClick={() =>
            dispatch({ type: 'setFilter', payload: Status.active })
          }
        >
          Active
        </a>
      </li>

      <li>
        <a
          className={Status.completed === filter ? 'selected' : ''}
          href="#/completed"
          onClick={() =>
            dispatch({ type: 'setFilter', payload: Status.completed })
          }
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
