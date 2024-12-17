import { useContext, useState } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../context/GlobalContext/GlobalContext';
import classNames from 'classnames';

export enum Filter {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const TodoFilters: React.FC = () => {
  const [pickedFilter, setPickedFilter] = useState(Filter.all as Filter);
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const todoLeft = todos.filter(todo => !todo.completed).length;
  const completedTodo = todos.filter(todo => todo.completed).length;
  const filterValues = Object.values(Filter);

  const handleFilterChange = (filterName: Filter) => {
    setPickedFilter(filterName);
    dispatch({ type: 'filter', payload: filterName });
  };

  const handleDeleteCompleted = () => {
    dispatch({ type: 'deleteCompleted' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todoLeft} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterValues.map(filter => (
          <a
            key={filter}
            href={`#/${filter === Filter.all ? '' : filter}`}
            className={classNames('filter__link', {
              selected: pickedFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        style={{ visibility: completedTodo > 0 ? 'visible' : 'hidden' }}
        disabled={completedTodo === 0}
        onClick={() => handleDeleteCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
