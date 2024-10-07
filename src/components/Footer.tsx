import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoFilter } from '../types/TodoFilter';
import classNames from 'classnames';

export const Footer = () => {
  const { todos, filterBy, setFilterBy, setTodos } = useContext(TodoContext);

  const activeTodosLength = todos.filter(t => !t.completed).length;
  const isDisabledBtn = !(todos.length - activeTodosLength);
  const title =
    activeTodosLength === 1 ? '1 item left' : `${activeTodosLength} items left`;

  const filterTodos = (status: TodoFilter) => {
    switch (status) {
      case 'Active':
        setFilterBy('Active');
        break;
      case 'Completed':
        setFilterBy('Completed');
        break;
      default:
        setFilterBy('All');
    }
  };

  const deleteCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {title}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => filterTodos('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterBy === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => filterTodos('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterBy === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => filterTodos('Completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: `${isDisabledBtn ? 'hidden' : 'visible'}` }}
        data-cy="ClearCompletedButton"
        onClick={deleteCompleted}
        disabled={isDisabledBtn}
      >
        Clear completed
      </button>
    </footer>
  );
};
