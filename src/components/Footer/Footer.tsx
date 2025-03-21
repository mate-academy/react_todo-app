import React, { useCallback } from 'react';
import { useDispatch, useGlobalState } from '../../Context/CustomHooks';
import { FilterType } from '../../types/globalTypes';
import classNames from 'classnames';

const filterTypes: FilterType[] = ['All', 'Active', 'Completed'];

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, filterType } = useGlobalState();
  const activeTodosAmount = todos.filter(todo => !todo.completed).length;
  const isCompletedExist = todos.some(todo => todo.completed);

  const handleCleanButtonClick = useCallback(() => {
    if (isCompletedExist) {
      dispatch({ type: 'todoDeleteAllCompleted' });
      dispatch({ type: 'isMainInputFocused', payload: true });
    }
  }, [dispatch, isCompletedExist]);

  return !todos.length ? null : (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosAmount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterTypes.map(filter => {
          const link = filter === 'All' ? '' : filter.toLowerCase();
          const isHighlighted = filterType === filter;

          return (
            <a
              key={filter}
              href={`#${link}`}
              className={classNames('filter__link', {
                selected: isHighlighted,
              })}
              data-cy={`FilterLink${filter}`}
              onClick={() =>
                dispatch({ type: 'updateFilterType', payload: filter })
              }
            >
              {filter}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompletedExist}
        onClick={handleCleanButtonClick}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
