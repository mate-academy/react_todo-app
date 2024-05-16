import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import classNames from 'classnames';
import { FilterParams } from '../../types/FilterParams';

export const Footer = () => {
  const { todos, setTodos, filterButton, setFilterButton } =
    useContext(TodosContext);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodosLenght = todos.filter(todo => todo.completed);
  const lengthOfActiveTodos = `${activeTodos.length} items left`;

  const handleClearButton = () => {
    const updateTodos = todos.filter(todo => !todo.completed);

    setTodos(updateTodos);
  };

  return (
    <>
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {lengthOfActiveTodos}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filterButton === FilterParams.ALL,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setFilterButton(FilterParams.ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filterButton === FilterParams.ACTIVE,
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilterButton(FilterParams.ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filterButton === FilterParams.COMPLETED,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilterButton(FilterParams.COMPLETED)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className={classNames('todoapp__clear-completed', {
              'todoapp__clear-completed--hidden':
                completedTodosLenght.length === 0,
            })}
            data-cy="ClearCompletedButton"
            onClick={handleClearButton}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
