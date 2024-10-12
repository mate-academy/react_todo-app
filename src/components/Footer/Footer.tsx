import { useContext } from 'react';
import {
  TodosContext,
  TodosDispatchContext,
} from '../TodoAppContext/TodoAppContext';
import classNames from 'classnames';
import { TodoStatus } from '../../types/TodoStatus';

export const Footer: React.FC = () => {
  const { todos, filterStatus } = useContext(TodosContext);
  const dispatch = useContext(TodosDispatchContext);
  const uncomletedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncomletedTodos.length + ' items left'}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterStatus === TodoStatus.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() =>
            dispatch({ type: 'filterBy', payload: TodoStatus.All })
          }
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterStatus === TodoStatus.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: 'filterBy', payload: TodoStatus.Active })
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterStatus === TodoStatus.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({ type: 'filterBy', payload: TodoStatus.Completed })
          }
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.length === uncomletedTodos.length}
        onClick={() => dispatch({ type: 'deleteCompletedTodos' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
