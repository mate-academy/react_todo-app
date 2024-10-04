import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Filters } from '../../types/Filters';
import { DispatchContext, StateContext } from '../GlobalContext';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

export const TodoFilter: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const uncmpltTodosCount = todos.filter(todo => !todo.completed).length;
  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter],
  );

  if (todos.length > 0) {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${uncmpltTodosCount} ${uncmpltTodosCount === 1 ? 'item left' : 'items left'}`}
        </span>

        <nav className="filter" data-cy="Filter">
          {Object.keys(Filters).map(filterButton => {
            const filterTitle = Filters[filterButton as keyof typeof Filters];

            return (
              <a
                key={filterButton}
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === filterTitle,
                })}
                data-cy={`FilterLink${filterTitle}`}
                onClick={() =>
                  dispatch({ type: 'setFilter', payload: filterTitle })
                }
              >
                {filterTitle}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => dispatch({ type: 'deleteAllCompleted' })}
          disabled={!filteredTodos.some(todo => todo.completed)}
        >
          Clear completed
        </button>
      </footer>
    );
  } else {
    return null;
  }
};
