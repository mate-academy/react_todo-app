import React, { useContext } from 'react';
import { StatusFilter } from '../../types/StatusFilter';
import classNames from 'classnames';
import { DispatchContext, TodosContext } from '../GlobalState/GlobalState';

type Props = {
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  countActiveTodo: number;
};

export const Footer: React.FC<Props> = ({
  statusFilter,
  setStatusFilter,
  countActiveTodo,
}) => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const deleteActiveTodos = () => {
    dispatch({ type: 'deleteCompletedTodos' });
  };

  const findCompletedItem = () => {
    return todos.some(todo => todo.completed);
  };

  const hasCompletedItem = findCompletedItem();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActiveTodo} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(StatusFilter).map((item, index) => (
          <a
            key={index}
            href="#/"
            className={classNames('filter__link', {
              selected: statusFilter === item,
            })}
            data-cy={`FilterLink${item}`}
            onClick={() => setStatusFilter(item)}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={deleteActiveTodos}
        disabled={!hasCompletedItem}
      >
        Clear completed
      </button>
    </footer>
  );
};
