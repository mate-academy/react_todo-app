import classNames from 'classnames';

import { useContext } from 'react';
import { AppContext } from '../../context';
import { Types } from '../../reducer';

export const FooterComponent = () => {
  const { state, dispatch } = useContext(AppContext);
  const { filter } = state;
  const clearCompleted = () => {
    dispatch({
      type: Types.ClearCompleted,
      payload: {},
    });
  };

  const filterBy = (
    e:React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filterByType: Types.FilterAll | Types.FilterActive | Types.FilterCompleted,
  ) => {
    e.preventDefault();
    dispatch({
      type: filterByType,
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${state.itemsLeft()} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filter === 'all',
            })}
            onClick={(e) => filterBy(e, Types.FilterAll)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === 'active',
            })}
            onClick={(e) => filterBy(e, Types.FilterActive)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === 'completed',
            })}
            onClick={(e) => filterBy(e, Types.FilterCompleted)}
          >
            Completed
          </a>
        </li>
      </ul>
      {(state.itemsLeft() !== state.todos.length) && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
