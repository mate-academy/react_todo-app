import classNames from 'classnames';
import {
  FILTER_FIELD_ACTIVE,
  FILTER_FIELD_ALL,
  FILTER_FIELD_COMPLETED,
} from '../../tools/constants';
import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';

export const Footer: React.FC = () => {
  const {
    todos,
    notCompletedTodos,
    filterField,
    setFilterField,
    handleDeleteCompleted,
  } = useContext(TodoContext);

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${notCompletedTodos.length} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filterField === FILTER_FIELD_ALL,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setFilterField(FILTER_FIELD_ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filterField === FILTER_FIELD_ACTIVE,
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilterField(FILTER_FIELD_ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filterField === FILTER_FIELD_COMPLETED,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilterField(FILTER_FIELD_COMPLETED)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={todos.every(todo => !todo.completed)}
            style={{
              visibility: todos.every(todo => !todo.completed)
                ? 'hidden'
                : 'visible',
            }}
            onClick={handleDeleteCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
