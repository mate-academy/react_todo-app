import classNames from 'classnames';
import { FilterStatus } from '../types/FilterStatus';
import { useTodoDispatch, useTodoState } from './TodoProvider';
import React from 'react';

type Props = {
  status: FilterStatus;
  setStatus: (status: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({ status, setStatus }) => {
  const { todos } = useTodoState();
  const dispatch = useTodoDispatch();
  const activeTodos = todos.filter(todo => !todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const filters = Object.values(FilterStatus);

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${activeTodos.length} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            {filters.map(filter => (
              <a
                key={filter}
                href={`#/${filter === FilterStatus.All ? '' : filter.toLowerCase()}`}
                className={classNames('filter__link', {
                  selected: status === filter,
                })}
                data-cy={`FilterLink${filter}`}
                onClick={() => setStatus(filter)}
              >
                {filter}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleClearCompleted}
            disabled={!hasCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
