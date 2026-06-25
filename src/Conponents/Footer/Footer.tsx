import { useContext } from 'react';
import { TodoContext } from '../../Context/Context';
import classNames from 'classnames';

export const Footer = () => {
  const {
    todos,
    clearTodos,
    handleStatusChange,
    todosStatus,
    focusNewTodoField,
  } = useContext(TodoContext);

  const notCompleated = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompleated} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: todosStatus === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleStatusChange('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: todosStatus === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleStatusChange('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: todosStatus === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleStatusChange('Completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          clearTodos();
          focusNewTodoField();
        }}
        disabled={todos.length === notCompleated}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
