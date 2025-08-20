import React, { useContext } from 'react';
import { DispathContext, TodoContext } from '../GlobalContext/GlobalContext';
import classNames from 'classnames';
import { FilterType } from '../../type/FilterType';

type Props = {
  filterValue: FilterType;
  setFilter: (value: FilterType) => void;
};

export const TodoFooter: React.FC<Props> = ({ filterValue, setFilter }) => {
  const todos = useContext(TodoContext);
  const dispatch = useContext(DispathContext);

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);
  const filters = Object.values(FilterType);

  const onClear = () => {
    dispatch({ type: 'deleteComplitedTodos' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filters.map((value, i) => (
          <a
            key={i}
            href={`#/${value !== FilterType.all ? value : ''}`}
            className={classNames('filter__link', {
              selected: filterValue === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={() => setFilter(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClear}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
