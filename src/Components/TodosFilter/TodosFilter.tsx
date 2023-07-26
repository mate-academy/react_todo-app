import { useContext } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../Store';
import { Status } from '../../types';

export const TodosFilter: React.FC = () => {
  const { todoList, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const itemsLeft = todoList.reduce((sum, todo) => sum + +!todo.completed, 0);
  const isHasCompleted = todoList.some(item => item.completed === true);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: filter === Status.all })}
            onClick={() => dispatch({ type: 'filter', payload: Status.all })}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: filter === Status.active })}
            onClick={() => dispatch({ type: 'filter', payload: Status.active })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: filter === Status.completed })}
            onClick={() => dispatch({
              type: 'filter',
              payload: Status.completed,
            })}
          >
            Completed
          </a>
        </li>
      </ul>

      {isHasCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: 'deleteAllCompleted' })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
