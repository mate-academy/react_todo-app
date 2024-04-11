import { useContext } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import classNames from 'classnames';
import { FilterSettings } from '../TodoContext/TodoContext';

export const Footer = () => {
  const { todosList, setTodosList, filterSettings, setFilterSettings } =
    useContext(TodoContext);

  const completedTodos = todosList.filter(todo => todo.completed === true);
  const unCompletedTodos = todosList.filter(todo => todo.completed !== true);

  const handleFiltering = (value: FilterSettings) => {
    setFilterSettings(value);
  };

  const handleClearCompleted = () => {
    setTodosList(unCompletedTodos);
  };

  return (
    todosList.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {unCompletedTodos.length} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filterSettings === 'all',
            })}
            data-cy="FilterLinkAll"
            onClick={() => handleFiltering(FilterSettings.all)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filterSettings === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => handleFiltering(FilterSettings.active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filterSettings === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => handleFiltering(FilterSettings.completed)}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
          disabled={completedTodos.length < 1}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
