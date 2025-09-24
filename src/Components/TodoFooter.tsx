import { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';
import { StatusFilter } from '../Types/Task';
import classNames from 'classnames';
import { useTodoService } from './Hooks/useTodoService';

export const TodoFooter = () => {
  const { todos, statusFilter, setStatusFilter, focusInput } =
    useContext(TodoContext);
  const { updateTodos } = useTodoService();
  const someCompletedTodos = todos.some(t => t.completed === true);

  const handleClearCompleted = () => {
    const update = todos.filter(t => !t.completed);

    updateTodos(update);
    focusInput.current?.();
  };

  return (
    <>
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.filter(task => !task.completed).length} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: statusFilter === StatusFilter.All,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setStatusFilter(StatusFilter.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: statusFilter === StatusFilter.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => setStatusFilter(StatusFilter.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: statusFilter === StatusFilter.Completed,
              })}
              onClick={() => setStatusFilter(StatusFilter.Completed)}
              data-cy="FilterLinkCompleted"
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => handleClearCompleted()}
            disabled={!someCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
