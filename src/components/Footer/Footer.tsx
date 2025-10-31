import { useContext } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

export const Footer: React.FC = () => {
  const { state: todos, dispatch, setFilter, filter } = useContext(TodoContext);

  const countOfNotCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed === false);

    return completedTodos.length;
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {countOfNotCompletedTodos()} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filter === Filter.all,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setFilter(Filter.all)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filter === Filter.active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilter(Filter.active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filter === Filter.completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilter(Filter.completed)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => dispatch({ type: 'clearCompleted' })}
            disabled={todos.every(todo => todo.completed === false)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
