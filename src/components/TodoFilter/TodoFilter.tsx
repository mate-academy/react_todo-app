import './TodoFilter.scss';

export const TodoFilter = () => {
  return (
    <nav className="todo-filter" data-cy="Filter">
      <a
        href="#/"
        className="todo-filter__link selected"
        data-cy="FilterLinkAll"
      >
        All
      </a>

      <a
        href="#/active"
        className="todo-filter__link"
        data-cy="FilterLinkActive"
      >
        Active
      </a>

      <a
        href="#/completed"
        className="todo-filter__link"
        data-cy="FilterLinkCompleted"
      >
        Completed
      </a>
    </nav>
  );
};
